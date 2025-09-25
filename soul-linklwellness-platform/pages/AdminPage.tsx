
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import Icon from '../components/Icon';

declare const lucide: any;
declare const Chart: any;

const StatCard: React.FC<{ icon: string; title: string; value: string; change: string }> = ({ icon, title, value, change }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-start justify-between">
        <div>
            <p className="text-slate-500 text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
            <p className="text-sm text-green-500 mt-2">{change}</p>
        </div>
        <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center">
            <Icon name={icon} className="w-6 h-6" />
        </div>
    </div>
);

const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-slate-800 mb-4">{title}</h3>
        {children}
    </div>
);


const AdminPage: React.FC = () => {
    const scoresChartRef = useRef<HTMLCanvasElement>(null);
    const usageChartRef = useRef<HTMLCanvasElement>(null);
    const resourcesChartRef = useRef<HTMLCanvasElement>(null);

    const chartInstances = useRef<{ scores?: any; usage?: any; resources?: any }>({});

    useEffect(() => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        if (typeof Chart === 'undefined') return;
        
        const textColor = '#475569';
        const gridColor = 'rgba(0, 0, 0, 0.1)';

        Chart.defaults.color = textColor;
        Chart.defaults.borderColor = gridColor;

        // Wellness Scores Chart (Bar)
        if (scoresChartRef.current) {
            const ctx = scoresChartRef.current.getContext('2d');
            chartInstances.current.scores = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Avg. Score',
                        data: [7.2, 7.5, 8.1, 7.9, 8.5, 8.3],
                        backgroundColor: 'rgba(56, 189, 248, 0.6)',
                        borderColor: 'rgba(56, 189, 248, 1)',
                        borderWidth: 1,
                        borderRadius: 4
                    }]
                },
                options: { scales: { y: { beginAtZero: true, max: 10 } } }
            });
        }

        // Platform Engagement Chart (Line)
        if (usageChartRef.current) {
            const ctx = usageChartRef.current.getContext('2d');
            chartInstances.current.usage = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
                    datasets: [{
                        label: 'Check-ins',
                        data: [120, 150, 130, 180, 210, 190],
                        borderColor: 'rgba(14, 165, 233, 1)',
                        tension: 0.3
                    }, {
                        label: 'Sessions Booked',
                        data: [30, 45, 40, 55, 60, 50],
                        borderColor: 'rgba(234, 179, 8, 1)',
                        tension: 0.3
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });
        }
        
        // Top Resources Chart (Doughnut)
        if (resourcesChartRef.current) {
            const ctx = resourcesChartRef.current.getContext('2d');
            chartInstances.current.resources = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Meditation Guides', 'Anxiety Articles', 'Peer Forum', 'Therapist Booking'],
                    datasets: [{
                        label: 'Usage',
                        data: [300, 250, 180, 150],
                        backgroundColor: ['#38bdf8', '#0ea5e9', '#0284c7', '#0369a1']
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });
        }
        
        // Cleanup function
        return () => {
            Object.values(chartInstances.current).forEach(chart => {
                if (chart) chart.destroy();
            });
            chartInstances.current = {};
        };
    }, []);


    return (
        <div className="min-h-screen bg-slate-100">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
                    <div className="flex items-center space-x-4">
                        <Logo />
                        <span className="text-xl font-semibold text-slate-600">Admin Portal</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors">
                            Logout
                        </Link>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-3xl font-bold text-slate-800 mb-8">Admin Dashboard: Student Wellness Overview</h1>

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <StatCard icon="users" title="Total Active Students" value="1,284" change="+5% this month" />
                    <StatCard icon="calendar" title="Appointments Booked (Month)" value="212" change="+12% this month" />
                    <StatCard icon="smile" title="Average Mood Score" value="8.3 / 10" change="+0.2 this month" />
                </section>
                
                <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-3">
                        <ChartCard title="Monthly Wellness Scores">
                             <canvas ref={scoresChartRef}></canvas>
                        </ChartCard>
                    </div>
                     <div className="lg:col-span-2">
                        <ChartCard title="Platform Engagement">
                            <div className="h-64">
                                <canvas ref={usageChartRef}></canvas>
                            </div>
                        </ChartCard>
                    </div>
                    <div className="lg:col-span-5 xl:col-span-2">
                         <ChartCard title="Top Resources Accessed">
                            <div className="h-64">
                                <canvas ref={resourcesChartRef}></canvas>
                            </div>
                        </ChartCard>
                    </div>
                    <div className="lg:col-span-5 xl:col-span-3">
                        <div className="bg-white p-6 rounded-xl shadow-md h-full">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h3>
                            <ul className="space-y-4 text-slate-600">
                                <li className="flex items-center space-x-3"><Icon name="user-plus" className="text-green-500"/><p>New student registration: student@example.com</p></li>
                                <li className="flex items-center space-x-3"><Icon name="calendar-check" className="text-sky-500"/><p>Dr. Anya Sharma confirmed 3 new appointments.</p></li>
                                <li className="flex items-center space-x-3"><Icon name="message-square" className="text-yellow-500"/><p>High traffic reported in the Peer Support Forum.</p></li>
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminPage;