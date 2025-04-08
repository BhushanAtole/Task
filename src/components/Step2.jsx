import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  department: yup.string().required('Department is required'),
  designation: yup.string().required('Designation is required'),
});

const Step2 = ({ nextStep, prevStep, updateFormData, values }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      department: values.department,
      designation: values.designation,
    },
    resolver: yupResolver(schema),
  });

const onSubmit = (data) => {
    updateFormData(data);
    nextStep();
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Department</label>
        <input
          {...register('department')}
          type="text"
          className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
        />
        {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Designation</label>
        <input
          {...register('designation')}
          type="text"
          className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
        />
        {errors.designation && <p className="text-red-500 text-sm mt-1">{errors.designation.message}</p>}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-[#046169] text-white px-4 py-2 rounded-md hover:bg-[#02474d] transition"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Step2;
