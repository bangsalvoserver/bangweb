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

interface Point {
    x: Date,
    y: number
}

function timestampsToPoints(counts: TimestampCount[], now: Date): Point[] {
    let result = counts.map(row => ({ x: new Date(row[0] * 1000), y: row[1] }));
    if (result.length !== 0) {
        result.push({ x: now, y: result[result.length - 1].y });
    }
    return result;
}

function TrackingDataChart({ data }: { data: TrackingData }) {
    const now = new Date();
    return <Line
        data={{
            datasets: [
                {
                    label: 'Client Count',
                    data: timestampsToPoints(data.client_count, now),
                    stepped: true,
                    borderColor: '#0000ff',
                    backgroundColor: '#ffffff',
                },
                {
                    label: 'User Count',
                    data: timestampsToPoints(data.user_count, now),
                    stepped: true,
                    borderColor: '#0080ff',
                    backgroundColor: '#ffffff',
                },
                {
                    label: 'Lobby Count',
                    data: timestampsToPoints(data.lobby_count, now),
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

    const length = new URLSearchParams(window.location.search).get('length') || '';
    const trackingData = useFetch<TrackingData>(bangServerUrl + '?length=' + length);

    return <div className="flex flex-col items-center">
        {trackingData && <TrackingDataChart data={trackingData} /> }
    </div>;
}