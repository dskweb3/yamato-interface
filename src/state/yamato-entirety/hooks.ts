import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../index';
import { fetchEvents, fetchRateOfEthJpy, fetchYamatoState } from './actions';
import { LogEvent } from './reducer';

export function useYamatoStateForDashboard() {
  return useSelector((state: AppState) => ({
    totalDebt: state.yamatoEntirety.totalDebt,
    tvl: state.yamatoEntirety.tvl,
    tcr: state.yamatoEntirety.tcr,
    rateOfEthJpy: state.yamatoEntirety.rateOfEthJpy,
  }));
}

export function useYamatoStateForPledge() {
  return useSelector((state: AppState) => ({
    totalCollateral: state.yamatoEntirety.totalCollateral,
    totalDebt: state.yamatoEntirety.totalDebt,
    tcr: state.yamatoEntirety.tcr,
    rateOfEthJpy: state.yamatoEntirety.rateOfEthJpy,
    redemptionReserve: state.yamatoEntirety.redemptionReserve,
    sweepReserve: state.yamatoEntirety.sweepReserve,
    sweepableCandiate: state.yamatoEntirety.sweepableCandiate,
  }));
}

export function useYamatoStateForWorld() {
  return useSelector((state: AppState) => ({
    events: state.yamatoEntirety.events,
  }));
}

export function useFetchYamatoState() {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (
      totalCollateral: number,
      totalDebt: number,
      tvl: number,
      tcr: number,
      redemptionReserve: number,
      sweepReserve: number,
      sweepableCandiate: number
    ) =>
      dispatch(
        fetchYamatoState({
          totalCollateral,
          totalDebt,
          tvl,
          tcr,
          redemptionReserve,
          sweepReserve,
          sweepableCandiate,
        })
      ),
    [dispatch]
  );
}
export function useFetchRateOfEthJpy() {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (rateOfEthJpy: number) => dispatch(fetchRateOfEthJpy({ rateOfEthJpy })),
    [dispatch]
  );
}
export function useFetchEvents() {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (events: LogEvent[]) => dispatch(fetchEvents({ events })),
    [dispatch]
  );
}