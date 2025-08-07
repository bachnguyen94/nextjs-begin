'use client';
import { useEffect, useRef } from 'react';
import { createChart, Time } from 'lightweight-charts';

const RealtimeCandleChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null); // Sửa kiểu thành any
  const candleSeriesRef = useRef<any>(null);

  useEffect(() => {
    chartRef.current = createChart(chartContainerRef.current!, {
      width: 800,
      height: 400,
      layout: {
        background: { color: '#ffffff' },
        textColor: '#000',
      },
      grid: {
        vertLines: { color: '#eee' },
        horzLines: { color: '#eee' },
      },
    });

    candleSeriesRef.current = chartRef.current.addCandlestickSeries();

    const socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1m');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const k = data.k;

      const candle = {
        time: Math.floor(k.t / 1000) as Time,
        open: parseFloat(k.o),
        high: parseFloat(k.h),
        low: parseFloat(k.l),
        close: parseFloat(k.c),
      };

      candleSeriesRef.current.update(candle);
    };

    return () => {
      socket.close();
      chartRef.current?.remove();
    };
  }, []);

  return <div ref={chartContainerRef} />;
};

export default RealtimeCandleChart;