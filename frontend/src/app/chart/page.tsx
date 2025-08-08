'use client';
import { useEffect, useRef, useState } from 'react';
import { createChart, Time, CandlestickSeries } from 'lightweight-charts';
import ApexCharts from "apexcharts";

const RealtimeCandleChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null); // Sửa kiểu thành any
  const candleSeriesRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartApexRef = useRef<any>(null);

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

    candleSeriesRef.current = chartRef.current.addSeries(CandlestickSeries, { upColor: '#26a69a', downColor: '#ef5350', borderVisible: false, wickUpColor: '#26a69a', wickDownColor: '#ef5350' });

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

    var c = canvasRef.current;
    if (c) {
        var ctx = c.getContext("2d");
        ctx?.moveTo(0,0);
        ctx?.lineTo(200,100);
        ctx?.stroke();
    }

    return () => {
      socket.close();
      chartRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    const options = {
      chart: {
        type: "candlestick",
        height: 350,
        animations: { enabled: true, dynamicAnimation: { speed: 300 } }
      },
      series: [{ data: [] }],
      xaxis: { type: "datetime" },
      plotOptions: {
        candlestick: {
          colors: { upward: "#00B746", downward: "#EF403C" }
        }
      }
    };

    chartApexRef.current = new ApexCharts(document.querySelector("#chart"), options);
    console.log(chartApexRef.current);
    chartApexRef.current.render();

    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@kline_1m");
    ws.onmessage = (msg) => {
      const payload = JSON.parse(msg.data);
      const k = payload.k;
      const point = {
        x: k.t,
        y: [parseFloat(k.o), parseFloat(k.h), parseFloat(k.l), parseFloat(k.c)]
      };

      chartApexRef.current.updateSeries([{ data: [...(chartApexRef.current.w.config.series[0].data || []), point] }], true);
    };

    return () => {
      ws.close();
      chartApexRef.current.destroy();
    };
  }, []);

  return (
    <>
      <div ref={chartContainerRef} />
      <canvas ref={canvasRef} width="200" height="100" style={{border:"1px solid #d3d3d3"}}>
        Your browser does not support the HTML canvas tag.</canvas>
        <div id="chart"></div>
    </>
  );
};

export default RealtimeCandleChart;