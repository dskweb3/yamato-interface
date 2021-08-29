import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  VStack,
} from '@chakra-ui/react';
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik';
import { useState } from 'react';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
import { useActiveWeb3React } from '../../../hooks/web3';
import { useWalletState } from '../../../state/wallet/hooks';
import {
  getExpectedCollateral,
  getRedeemableCandidate,
} from '../shared/function';

type Props = {
  totalCollateral: number;
  totalDebt: number;
  tcr: number;
  rateOfEthJpy: number;
};

export default function RedemptionInput(props: Props) {
  const { account, library } = useActiveWeb3React();
  const { cjpy } = useWalletState();

  const [redemption, setRedemption] = useState(0);
  const redeemableCandidate = getRedeemableCandidate(
    props.totalCollateral,
    props.totalDebt,
    props.tcr,
    props.rateOfEthJpy
  );

  async function validateRedemption(value: number) {
    if (value == null || typeof value !== 'number') {
      return '数値で入力してください。';
    }
    if (value > cjpy) {
      return '残高が足りません。';
    }

    if (value > redeemableCandidate.cjpy) {
      return '可能数量を超えています。';
    }

    // Value is correct
    setRedemption(value);
    return undefined;
  }

  function submitRedemption(
    values: { redemption: number },
    formikHelpers: FormikHelpers<{
      redemption: number;
    }>
  ) {
    console.log('submit redemption', values);
    // TODO: 償還実行。storeを使わずにabiを直接叩く。
    values.redemption;

    // reset
    setRedemption(0);
    formikHelpers.resetForm();
  }

  return (
    <Formik initialValues={{ redemption: 0 }} onSubmit={submitRedemption}>
      {(formikProps) => (
        <Form>
          <Grid templateColumns="repeat(4, 1fr)" gap={4}>
            <GridItem colSpan={1}>
              <Field name="redemption" validate={validateRedemption}>
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.redemption && !!form.touched.redemption
                    }
                    style={{ maxWidth: '200px' }}
                  >
                    <FormLabel htmlFor="redemption">償還実行額入力</FormLabel>
                    <Input
                      {...field}
                      id="redemption"
                      type="number"
                      placeholder={YAMATO_SYMBOL.YEN}
                    />
                    <FormErrorMessage>
                      {form.errors.redemption}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              {redemption > 0 && (
                <VStack align="start" mt={4}>
                  <label>予想担保獲得数</label>
                  <span>
                    {getExpectedCollateral(redemption, redeemableCandidate.eth)}
                    {YAMATO_SYMBOL.COLLATERAL}
                  </span>
                </VStack>
              )}
            </GridItem>

            <GridItem colSpan={2}>
              <VStack align="start">
                <label>償還候補総額</label>
                <span>
                  {redeemableCandidate.cjpy.toFixed(4)}
                  {YAMATO_SYMBOL.YEN}
                </span>
              </VStack>
            </GridItem>

            <GridItem colSpan={1}>
              <Button
                colorScheme="teal"
                isLoading={formikProps.isSubmitting}
                type="submit"
              >
                償還実行
              </Button>
            </GridItem>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
