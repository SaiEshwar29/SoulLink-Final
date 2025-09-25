
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import Icon from '../components/Icon';
import { useUser } from '../hooks/useUser';

declare const lucide: any;

const StatCard: React.FC<{ icon: string; label: string; value: string | number }> = ({ icon, label, value }) => (
  <div className="bg-slate-100 p-4 rounded-lg flex items-center space-x-4">
    <div className="p-3 bg-sky-100 text-sky-600 rounded-full">
        <Icon name={icon} className="w-6 h-6" />
    </div>
    <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-xl font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

const InfoRow: React.FC<{ label: string; value: string; isEditing: boolean; name: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ label, value, isEditing, name, onChange }) => {
    const inputClasses = "w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500";
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-1 items-center">
            <span className="font-semibold text-slate-500">{label}:</span>
            {isEditing ? (
                <input
                    type="text"
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`sm:col-span-2 ${inputClasses}`}
                />
            ) : (
                <span className="sm:col-span-2 text-slate-800">{value}</span>
            )}
        </div>
    );
};


const ProfilePage: React.FC = () => {
    const { user, updateUser } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(() => user || { name: '', pronouns: '', major: '', email: '' });
    const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, []);

    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev!, [name]: value }));
    };

    const handleSave = () => {
        if (formData) {
            updateUser(formData);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        if (user) {
            setFormData(user);
        }
        setIsEditing(false);
    };
    
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileSelect = () => fileInputRef.current?.click();

    if (!user) {
        return <div>Loading user profile...</div>;
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <header className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <Logo />
                        <nav className="hidden md:flex items-center space-x-8">
                            <Link to="/dashboard" className="font-medium text-slate-600 hover:text-sky-600">Dashboard</Link>
                            <Link to="/profile" className="font-medium text-sky-600">Profile</Link>
                        </nav>
                        <div className="flex items-center space-x-4">
                            <Link to="/" className="bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors">
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <section className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-800">My Profile</h1>
                    <p className="mt-2 text-lg text-slate-500">Manage your account settings and personal information.</p>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white p-6 rounded-xl shadow-md text-center">
                            <div className="relative w-32 h-32 mx-auto mb-4 group">
                                <img src={profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
                                <button 
                                    onClick={triggerFileSelect}
                                    className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                    aria-label="Change profile picture"
                                >
                                    <Icon name="camera" className="w-8 h-8"/>
                                </button>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    onChange={handleImageUpload} 
                                    className="hidden" 
                                    accept="image/*"
                                />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>
                            <p className="text-slate-500">{user.email}</p>
                        </div>
                         <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
                            <StatCard icon="clipboard-check" label="Wellness Check-ins" value="12" />
                            <StatCard icon="calendar" label="Appointments" value="3" />
                            <StatCard icon="book-open" label="Resources Viewed" value="28" />
                        </div>
                    </div>

                    <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-md">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-slate-800">About Me</h3>
                             {!isEditing && (
                                <button 
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center space-x-2 text-sky-600 font-semibold hover:text-sky-500"
                                >
                                    <Icon name="edit-3" className="w-4 h-4" />
                                    <span>Edit Profile</span>
                                </button>
                            )}
                        </div>
                        <div className="space-y-6">
                            <InfoRow label="Full Name" name="name" value={formData.name} isEditing={isEditing} onChange={handleChange} />
                            <InfoRow label="Pronouns" name="pronouns" value={formData.pronouns} isEditing={isEditing} onChange={handleChange} />
                            <InfoRow label="Major" name="major" value={formData.major} isEditing={isEditing} onChange={handleChange} />
                            
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-1 items-center">
                                <span className="font-semibold text-slate-500">Email:</span>
                                <span className="sm:col-span-2 text-slate-800">{user.email}</span>
                            </div>

                        </div>
                        {isEditing && (
                            <div className="mt-8 flex justify-end space-x-4">
                                <button 
                                    onClick={handleCancel}
                                    className="bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleSave}
                                    className="bg-sky-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-700 transition-colors"
                                >
                                    Save Changes
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <footer className="bg-white mt-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-slate-500">
                    <p>&copy; {new Date().getFullYear()} SoulLink. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default ProfilePage;