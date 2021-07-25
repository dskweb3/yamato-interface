import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Grid,
  GridItem,
  Heading,
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import Dashboad from '../components/Dashboad';
import Footer from '../components/Footer';
import Infographics from '../components/Infographics';
import World from '../components/World';

export default function Index() {
  return (
    <>
      <Box p={4}>
        <Helmet title="Yamato Protocol" />

        <Grid
          templateRows="repeat(15, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={4}
        >
          <GridItem rowSpan={1} colSpan={5}>
            <Heading as="h1" size="xl">
              Yamato Protocol
            </Heading>
          </GridItem>

          <GridItem rowSpan={4} colSpan={4}>
            <Dashboad />
          </GridItem>

          <GridItem rowSpan={8} colSpan={1}>
            <World />
          </GridItem>

          <GridItem rowSpan={8} colSpan={4}>
            <Accordion allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      My Pledge
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>Under construction</AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      償還
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>Under construction</AccordionPanel>
              </AccordionItem>
            </Accordion>
          </GridItem>

          <GridItem rowSpan={4} colSpan={1}>
            <Infographics />
          </GridItem>

          <GridItem rowSpan={2} colSpan={5}>
            <Footer />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}