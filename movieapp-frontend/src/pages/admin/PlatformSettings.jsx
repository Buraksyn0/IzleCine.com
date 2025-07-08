import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

const PlatformSettings = () => {
    const navigate = useNavigate();
    const [settings, setSettings] = useState({
        siteName: 'İzleCine',
        siteDescription: 'Film ve dizi izleme platformu',
        maintenanceMode: false,
        allowUserRegistration: true,
        maxUploadSize: 10,
        defaultLanguage: 'tr',
        timezone: 'Europe/Istanbul',
        emailNotifications: true,
        socialMediaLinks: {
            facebook: '',
            twitter: '',
            instagram: '',
            youtube: ''
        }
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSocialMediaChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({
            ...prev,
            socialMediaLinks: {
                ...prev.socialMediaLinks,
                [name]: value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle the settings update logic
        console.log('Saving settings:', settings);
    };

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-8">
                <button
                    onClick={() => navigate('/admin')}
                    className="text-gray-300 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-3xl font-bold text-white">Platform Ayarları</h1>
            </div>

            {/* Settings Form */}
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    {/* General Settings */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white">Genel Ayarlar</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-300">
                                    Site Adı
                                </label>
                                <input
                                    type="text"
                                    name="siteName"
                                    value={settings.siteName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-300">
                                    Site Açıklaması
                                </label>
                                <input
                                    type="text"
                                    name="siteDescription"
                                    value={settings.siteDescription}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-300">
                                    Varsayılan Dil
                                </label>
                                <select
                                    name="defaultLanguage"
                                    value={settings.defaultLanguage}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="tr">Türkçe</option>
                                    <option value="en">English</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-300">
                                    Saat Dilimi
                                </label>
                                <select
                                    name="timezone"
                                    value={settings.timezone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Europe/Istanbul">Europe/Istanbul</option>
                                    <option value="UTC">UTC</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* System Settings */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white">Sistem Ayarları</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    name="maintenanceMode"
                                    checked={settings.maintenanceMode}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                                />
                                <label className="text-sm font-medium text-gray-300">
                                    Bakım Modu
                                </label>
                            </div>

                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    name="allowUserRegistration"
                                    checked={settings.allowUserRegistration}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                                />
                                <label className="text-sm font-medium text-gray-300">
                                    Kullanıcı Kaydına İzin Ver
                                </label>
                            </div>

                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    name="emailNotifications"
                                    checked={settings.emailNotifications}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                                />
                                <label className="text-sm font-medium text-gray-300">
                                    E-posta Bildirimleri
                                </label>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-300">
                                    Maksimum Yükleme Boyutu (MB)
                                </label>
                                <input
                                    type="number"
                                    name="maxUploadSize"
                                    value={settings.maxUploadSize}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Social Media Settings */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white">Sosyal Medya Bağlantıları</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-300">
                                    Facebook
                                </label>
                                <input
                                    type="url"
                                    name="facebook"
                                    value={settings.socialMediaLinks.facebook}
                                    onChange={handleSocialMediaChange}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-300">
                                    Twitter
                                </label>
                                <input
                                    type="url"
                                    name="twitter"
                                    value={settings.socialMediaLinks.twitter}
                                    onChange={handleSocialMediaChange}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-300">
                                    Instagram
                                </label>
                                <input
                                    type="url"
                                    name="instagram"
                                    value={settings.socialMediaLinks.instagram}
                                    onChange={handleSocialMediaChange}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-300">
                                    YouTube
                                </label>
                                <input
                                    type="url"
                                    name="youtube"
                                    value={settings.socialMediaLinks.youtube}
                                    onChange={handleSocialMediaChange}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                        >
                            <Save className="w-5 h-5 mr-2" />
                            Ayarları Kaydet
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PlatformSettings; 