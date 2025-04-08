import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { motion, AnimatePresence } from 'framer-motion';
import Step4 from './Step4';

const StepperForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    designation: '',
    role: '',
    joiningDate: '',
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };
  
  const handleSubmit = () => {
    console.log('✅ Final Data:', formData);
    alert('🎉 User created successfully!');
    // TODO: Replace with API call
  };

  const currentStepComponent = {
    1: <Step1 nextStep={nextStep} updateFormData={updateFormData} values={formData} />,
    2: <Step2 nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} values={formData} />,
    3: <Step4 nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} values={formData} />,
    4: <Step3 prevStep={prevStep} values={formData} updateFormData={updateFormData} handleSubmit={handleSubmit} />,
  };

  const stepTitles = ['Basic Info', 'Job Info','Role', 'Review & Submit'];
  // const progress = (step / 4) * 100;
  const progress = (step / Object.keys(currentStepComponent).length) * 100;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-4">Create New User</h2>

      {/* Progress Bar */}
      <div className="relative mb-6">
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div className="bg-[#046169] h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          {stepTitles.map((title, index) => (
            <span key={index} className={step === index + 1 ? 'font-semibold text-[#046169]' : ''}>
              {title}
            </span>
          ))}
        </div>
      </div>

      {/* Animated Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          {currentStepComponent[step]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default StepperForm;
