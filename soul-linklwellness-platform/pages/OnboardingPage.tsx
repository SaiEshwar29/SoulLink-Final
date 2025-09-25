
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';


// To satisfy TypeScript, as Chart.js and lucide are loaded from script tags
declare const Chart: any;
declare const lucide: any;

const questionnaireQuestions = [
    { id: 'q1', text: 'Feeling nervous, anxious, or on edge.', category: 'Anxiety' },
    { id: 'q2', text: 'Not being able to stop or control worrying.', category: 'Anxiety' },
    { id: 'q3', text: 'Worrying too much about different things.', category: 'Anxiety' },
    { id: 'q4', text: 'Trouble relaxing.', category: 'Anxiety' },
    { id: 'q5', text: 'Becoming easily annoyed or irritable.', category: 'Stress' },
    { id: 'q6', text: 'Feeling afraid as if something awful might happen.', category: 'Stress' },
    { id: 'q7', text: 'Little interest or pleasure in doing things.', category: 'Mood' },
    { id: 'q8', text: 'Feeling down, depressed, or hopeless.', category: 'Mood' },
    { id: 'q9', text: 'Feeling tired or having little energy.', category: 'Energy' },
    { id: 'q10', text: 'Trouble falling or staying asleep, or sleeping too much.', category: 'Energy' },
];

const options = [
    { label: 'Not at all', value: 0 },
    { label: 'Several days', value: 1 },
    { label: 'More than half the days', value: 2 },
    { label: 'Nearly every day', value: 3 },
];

const OnboardingPage: React.FC = () => {
    const [showReport, setShowReport] = useState(false);
    const [scores, setScores] = useState<Record<string, number> | null>(null);
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<any>(null);

    useEffect(() => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newScores: Record<string, number> = {};
        let totalScore = 0;
        
        questionnaireQuestions.forEach(q => {
            const value = formData.get(q.id);
            if (value !== null) {
                const numericValue = parseInt(value as string, 10);
                newScores[q.id] = numericValue;
                totalScore += numericValue;
            } else {
                 newScores[q.id] = 0; // Default to 0 if not answered
            }
        });
        
        setScores({ ...newScores, total: totalScore });
        setShowReport(true);
    };

    const getInterpretation = (totalScore: number): string => {
        if (totalScore <= 5) return "Your responses suggest you're managing well. Keep up the great self-care, and remember SoulLink is here if you need support.";
        if (totalScore <= 10) return "It looks like you've been experiencing some mild stress or emotional challenges. This is very common, and SoulLink has resources that can help you navigate these feelings.";
        if (totalScore <= 15) return "Your answers indicate you might be going through a period of moderate stress. It's a good step to acknowledge this. We strongly recommend exploring our resources or booking a consultation.";
        return "It seems like you've been feeling significant distress lately. Please know that you are not alone and seeking support is a sign of strength. We encourage you to connect with a professional through our platform soon.";
    };

    const getChartData = () => {
        if (!scores) return { labels: [], datasets: [] };

        const categoryScores: Record<string, { total: number; count: number }> = {};
        questionnaireQuestions.forEach(q => {
            if (!categoryScores[q.category]) {
                categoryScores[q.category] = { total: 0, count: 0 };
            }
            categoryScores[q.category].total += scores[q.id] || 0;
            categoryScores[q.category].count += 1;
        });

        const labels = Object.keys(categoryScores);
        const data = labels.map(label => {
            // As percentage of max score for category (max value is 3)
            const avg = (categoryScores[label].total / (categoryScores[label].count * 3)) * 100;
            return avg.toFixed(2);
        });
        
        return {
            labels,
            datasets: [{
                label: 'Wellness Areas',
                data,
                backgroundColor: 'rgba(56, 189, 248, 0.2)',
                borderColor: 'rgba(56, 189, 248, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(56, 189, 248, 1)',
            }]
        };
    };

    useEffect(() => {
        if (showReport && scores && chartRef.current && typeof Chart !== 'undefined') {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'radar',
                data: getChartData(),
                options: {
                    scales: {
                        r: {
                            angleLines: { color: 'rgba(0, 0, 0, 0.1)' },
                            grid: { color: 'rgba(0, 0, 0, 0.1)' },
                            suggestedMin: 0,
                            suggestedMax: 100,
                            pointLabels: {
                                font: { size: 14 },
                                color: '#475569',
                            },
                            ticks: {
                                backdropColor: 'transparent',
                                color: '#64748b',
                                stepSize: 25,
                                callback: function(value: any) {
                                    return value + '%'
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: { display: false },
                    },
                    maintainAspectRatio: false,
                }
            });
        }
         // Cleanup on component unmount
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, [showReport, scores]);


    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4 py-8">
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.6s ease-out forwards;
                }
            `}</style>
            <div className="w-full max-w-3xl">
                <div className="flex justify-center mb-8">
                    <Logo />
                </div>

                <div className="bg-white p-8 sm:p-12 rounded-xl shadow-lg">
                    {!showReport ? (
                        <div id="questionnaire-section" className="animate-fade-in">
                            <h1 className="text-3xl font-bold text-slate-800 text-center">Welcome! Let's start with a quick check-in.</h1>
                            <p className="text-slate-500 mt-3 text-center">Your answers are confidential and help us tailor your experience. Please respond based on how you have felt over the last 2 weeks.</p>
                            
                            <form onSubmit={handleSubmit} className="mt-10 space-y-8">
                                {questionnaireQuestions.map((q, index) => (
                                    <fieldset key={q.id}>
                                        <legend className="font-semibold text-slate-700">{index + 1}. {q.text}</legend>
                                        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {options.map(opt => (
                                                <div key={opt.value}>
                                                    <input type="radio" id={`${q.id}-${opt.value}`} name={q.id} value={opt.value} required className="hidden peer" />
                                                    <label htmlFor={`${q.id}-${opt.value}`} className="block w-full text-center p-3 border border-slate-300 rounded-lg cursor-pointer text-sm text-slate-600 peer-checked:bg-sky-100 peer-checked:border-sky-500 peer-checked:text-sky-700 font-medium transition-colors">
                                                        {opt.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </fieldset>
                                ))}

                                <button type="submit" className="w-full bg-sky-600 text-white font-bold py-3 rounded-lg hover:bg-sky-700 transition-colors !mt-12">
                                    See My Report
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div id="report-section" className="animate-fade-in text-center">
                            <h1 className="text-3xl font-bold text-slate-800">Your Confidential Wellness Report</h1>
                             <p className="text-slate-500 mt-3">This is a snapshot based on your responses, not a diagnosis. It's a starting point for your wellness journey.</p>

                            <div className="my-8 h-80 relative">
                                <canvas ref={chartRef} id="reportChart"></canvas>
                            </div>
                            
                            <div className="bg-slate-100 p-6 rounded-lg">
                                <h2 className="text-xl font-bold text-slate-800">A Note for You</h2>
                                <p className="mt-2 text-slate-600">
                                    {scores ? getInterpretation(scores.total) : ''}
                                </p>
                            </div>

                            <Link to="/dashboard" className="inline-block w-full bg-sky-600 text-white font-bold py-3 rounded-lg hover:bg-sky-700 transition-colors mt-8">
                                Continue to Dashboard
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OnboardingPage;