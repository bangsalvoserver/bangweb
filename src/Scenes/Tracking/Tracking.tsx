import { Chart as ChartJS, registerables } from 'chart.js';
import 'chartjs-adapter-moment';
import { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import Env from "../../Model/Env";

ChartJS.register(...registerables);

function useFetch<T>(url: string): T | undefined {
    const [result, setResult] = useState<T>();

    useEffect(() => {
        let fetching = true;
        (async () => {
            const response = await fetch(url);
            if (response.ok) {
                const json = await response.json();
                if (fetching) {
                    setResult(json);
                }
            }
        })();
        return () => { fetching = false; };
    }, [url]);

    return result;
}

type Timestamp = number;
type TimestampCount = [Timestamp, number];

interface TrackingData {
    client_count: TimestampCount[];
    user_count: TimestampCount[];
    lobby_count: TimestampCount[];
}

function timestampToDate(timestamp: Timestamp) {
    return new Date(timestamp * 1000);
}

function TrackingDataChart({ data }: { data: TrackingData }) {
    return <Line
        data={{
            datasets: [
                {
                    label: 'Client Count',
                    data: data.client_count.map(row => ({ x: timestampToDate(row[0]), y: row[1] })),
                    stepped: true,
                    borderColor: '#0000ff',
                    backgroundColor: '#ffffff',
                },
                {
                    label: 'User Count',
                    data: data.user_count.map(row => ({ x: timestampToDate(row[0]), y: row[1] })),
                    stepped: true,
                    borderColor: '#0080ff',
                    backgroundColor: '#ffffff',
                },
                {
                    label: 'Lobby Count',
                    data: data.lobby_count.map(row => ({ x: timestampToDate(row[0]), y: row[1] })),
                    stepped: true,
                    borderColor: '#ff8000',
                    backgroundColor: '#ffffff',
                },
            ]
        }}

        options={{
            scales: { x: { type: 'time' }, },
            elements: { point: { radius: 0 }}
        }}
    />;
}

export default function TrackingScene() {
    const bangServerUrl = useMemo(() => {
        if (!Env.bangServerUrl) {
            throw new Error('missing BANG_SERVER_URL environment variable');
        }
        let url = Env.bangServerUrl.replace('wss://', 'https://').replace('ws://', 'http://');
        if (!url.endsWith('/')) {
            url += '/';
        }
        url += 'tracking';
        return url;
    }, []);

    const sinceDate = new URLSearchParams(window.location.search).get('since_date') || '';
    const trackingData = useFetch<TrackingData>(bangServerUrl + '?since_date=' + sinceDate);

    return <div className="flex flex-col items-center">
        {trackingData && <TrackingDataChart data={trackingData} /> }
    </div>;
}