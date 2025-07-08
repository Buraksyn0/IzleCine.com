import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';

const CompleteProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    city: '',
    birthYear: '',
    bio: '',
    favoriteGenres: []
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null);

  // Memoize star and meteor data to prevent re-rendering
  const starElements = useMemo(() => {
    return [...Array(100)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      opacity: Math.random() * 0.5 + 0.3,
      className: `star star-${(i % 4) + 1}`
    }));
  }, []);

  const meteorElements = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 1}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${4 + Math.random() * 2}s`
    }));
  }, []);

  // Available genres for selection
  const availableGenres = [
    'Aksiyon', 'Komedi', 'Drama', 'Korku', 'Bilim Kurgu', 
    'Romantik', 'Gerilim', 'Belgesel', 'Animasyon', 'Fantastik'
  ];

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.firstName.trim()) {
          newErrors.firstName = 'Ad alanı zorunludur';
        } else if (formData.firstName.trim().length < 2) {
          newErrors.firstName = 'Ad en az 2 karakter olmalıdır';
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = 'Soyad alanı zorunludur';
        } else if (formData.lastName.trim().length < 2) {
          newErrors.lastName = 'Soyad en az 2 karakter olmalıdır';
        }
        break;
      case 2:
        if (formData.birthYear && (formData.birthYear < 1900 || formData.birthYear > new Date().getFullYear())) {
          newErrors.birthYear = 'Geçerli bir doğum yılı giriniz';
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleGenreToggle = (genre) => {
    setFormData(prev => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.includes(genre)
        ? prev.favoriteGenres.filter(g => g !== genre)
        : [...prev.favoriteGenres, genre]
    }));
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const profileData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        city: formData.city.trim() || undefined,
        birthYear: formData.birthYear ? parseInt(formData.birthYear) : undefined,
        bio: formData.bio.trim() || undefined,
        favoriteGenres: formData.favoriteGenres
      };

      const updatedUser = await apiService.updateUserProfile(token, profileData);
      
      // Update localStorage with new user data
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUserData = { ...currentUser, ...updatedUser };
      localStorage.setItem('user', JSON.stringify(updatedUserData));
      
      // Dispatch event to update header
      window.dispatchEvent(new Event('userChanged'));
      
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/user-profile');
      }, 2000);
    } catch (error) {
      console.error('Profile update error:', error);
      alert(error.message || 'Profil güncellenirken bir hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (label, name, type = 'text', placeholder = '', required = false) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        className={`w-full px-4 py-3 bg-gray-700/50 text-white rounded-lg border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
          errors[name] ? 'border-red-500' : ''
        }`}
        placeholder={placeholder}
        required={required}
        disabled={isSubmitting}
      />
      {errors[name] && (
        <p className="text-red-400 text-xs mt-1 animate-pulse">{errors[name]}</p>
      )}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">👤</span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Kişisel Bilgiler</h3>
        <p className="text-gray-400">Temel bilgilerinizi girin</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {renderField('Ad', 'firstName', 'text', 'Adınız', true)}
        {renderField('Soyad', 'lastName', 'text', 'Soyadınız', true)}
      </div>
      
      <div className="flex justify-end">
        <button
          type="button"
          onClick={nextStep}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:from-purple-700 hover:to-indigo-700 hover:scale-105"
        >
          İleri →
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📍</span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Ek Bilgiler</h3>
        <p className="text-gray-400">İsteğe bağlı bilgilerinizi ekleyin</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {renderField('Şehir', 'city', 'text', 'Şehriniz')}
        {renderField('Doğum Yılı', 'birthYear', 'number', 'Doğum yılınız')}
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          Hakkımda
        </label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-gray-700/50 text-white rounded-lg border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
          placeholder="Kendiniz hakkında kısa bir açıklama..."
          rows="3"
          disabled={isSubmitting}
        />
      </div>
      
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="text-gray-400 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300"
        >
          ← Geri
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:from-purple-700 hover:to-indigo-700 hover:scale-105"
        >
          İleri →
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🎬</span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Favori Türler</h3>
        <p className="text-gray-400">Sevdiğiniz film türlerini seçin</p>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {availableGenres.map((genre) => (
            <button
              key={genre}
              type="button"
              onClick={() => handleGenreToggle(genre)}
              className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                formData.favoriteGenres.includes(genre)
                  ? 'border-purple-500 bg-purple-500/20 text-white'
                  : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-purple-500 hover:bg-purple-500/10'
              }`}
              disabled={isSubmitting}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="text-gray-400 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300"
        >
          ← Geri
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:from-green-700 hover:to-emerald-700 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Kaydediliyor...' : 'Profili Tamamla'}
        </button>
      </div>
    </div>
  );

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">Adım {currentStep}/3</span>
        <span className="text-sm text-purple-400">{Math.round((currentStep / 3) * 100)}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / 3) * 100}%` }}
        />
      </div>
    </div>
  );

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-purple-800 to-black bg-opacity-90 relative flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Profil Tamamlandı!</h2>
          <p className="text-gray-300 text-lg">Profiliniz başarıyla kaydedildi. Yönlendiriliyorsunuz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-purple-800 to-black bg-opacity-90 relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        {meteorElements.map((meteor) => (
          <div
            key={meteor.id}
            className="meteor"
            style={{
              top: meteor.top,
              left: meteor.left,
              animationDelay: meteor.animationDelay,
              animationDuration: meteor.animationDuration,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        {starElements.map((star) => (
          <div
            key={star.id}
            className={star.className}
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.animationDelay,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      {/* Complete Profile Form */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-700/50 transition-all duration-500 ease-out opacity-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Profilinizi Tamamlayın</h2>
              <p className="text-gray-300">Hesabınızı tamamlamak için aşağıdaki adımları takip edin.</p>
            </div>

            {renderProgressBar()}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
            </form>
            
            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => navigate('/user-profile')}
                className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors duration-300 hover:underline"
              >
                Daha sonra tamamla
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile; 