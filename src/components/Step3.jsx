import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  joiningDate: yup.string().required('Joining date is required'),
});

const Step3 = ({ prevStep, values,updateFormData, handleSubmit: parentSubmit }) => {
    console.log(values);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      joiningDate: values.joiningDate,
    },
    resolver: yupResolver(schema),
  });

const onSubmit = (data) => {
    updateFormData(data);
    parentSubmit(); // Final submit
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-3">Review Info</h3>
        <ul className="space-y-1 text-sm text-gray-800">
          <li><strong>Name:</strong> {values.name}</li>
          <li><strong>Email:</strong> {values.email}</li>
          <li><strong>Department:</strong> {values.department}</li>
          <li><strong>Designation:</strong> {values.designation}</li>
          <li><strong>Designation:</strong> {values.role}</li>
        </ul>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Joining Date</label>
        <input
          type="date"
          {...register('joiningDate')}
          className="mt-1 px-4 py-2 border w-full rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
        />
        {errors.joiningDate && <p className="text-red-500 text-sm mt-1">{errors.joiningDate.message}</p>}
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
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Step3;
