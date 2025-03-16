import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Pin form validation schema
const PinSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name is required'),
  date: Yup.date()
    .required('Date is required'),
  description: Yup.string()
    .min(10, 'Description should be at least 10 characters')
    .max(500, 'Description should not exceed 500 characters')
    .required('Description is required'),
  imageUrl: Yup.string()
    .url('Must be a valid URL'),
  value: Yup.number()
    .min(0, 'Value cannot be negative')
    .required('Value is required'),
  mainCategory: Yup.string()
    .oneOf(['finance', 'social', 'health'], 'Invalid category')
    .required('Main category is required'),
  categories: Yup.array()
    .of(Yup.string().oneOf(['finance', 'social', 'health'], 'Invalid category'))
    .min(1, 'At least one category is required')
    .required('Categories are required')
});

export default function PinForm({ initialValues, onSubmit, onCancel }) {
  const handleSubmit = (values) => {
    // Make sure main category is included in categories
    if (!values.categories.includes(values.mainCategory)) {
      values.categories.push(values.mainCategory);
    }
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={PinSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form className="space-y-4">
          {/* Pin Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Field
              type="text"
              name="name"
              id="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600" />
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <Field
              type="date"
              name="date"
              id="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <ErrorMessage name="date" component="div" className="mt-1 text-sm text-red-600" />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Field
              as="textarea"
              name="description"
              id="description"
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <ErrorMessage name="description" component="div" className="mt-1 text-sm text-red-600" />
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <Field
              type="text"
              name="imageUrl"
              id="imageUrl"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <ErrorMessage name="imageUrl" component="div" className="mt-1 text-sm text-red-600" />
            {values.imageUrl && (
              <div className="mt-2">
                <img 
                  src={values.imageUrl} 
                  alt="Preview" 
                  className="h-32 w-full object-cover rounded"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x200?text=Invalid+Image+URL';
                  }}
                />
              </div>
            )}
          </div>

          {/* Numerical Value */}
          <div>
            <label htmlFor="value" className="block text-sm font-medium text-gray-700">
              Value
            </label>
            <Field
              type="number"
              name="value"
              id="value"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <ErrorMessage name="value" component="div" className="mt-1 text-sm text-red-600" />
          </div>

          {/* Main Category */}
          <div>
            <label htmlFor="mainCategory" className="block text-sm font-medium text-gray-700">
              Main Category
            </label>
            <Field
              as="select"
              name="mainCategory"
              id="mainCategory"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="finance">Finance</option>
              <option value="social">Social</option>
              <option value="health">Health</option>
            </Field>
            <ErrorMessage name="mainCategory" component="div" className="mt-1 text-sm text-red-600" />
          </div>

          {/* Categories (Multiple Selection) */}
          <div>
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700">
                Categories (Select all that apply)
              </legend>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    name="categories"
                    id="category-finance"
                    value="finance"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="category-finance"
                    className="ml-3 text-sm font-medium text-gray-700"
                  >
                    Finance
                  </label>
                </div>
                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    name="categories"
                    id="category-social"
                    value="social"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="category-social"
                    className="ml-3 text-sm font-medium text-gray-700"
                  >
                    Social
                  </label>
                </div>
                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    name="categories"
                    id="category-health"
                    value="health"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="category-health"
                    className="ml-3 text-sm font-medium text-gray-700"
                  >
                    Health
                  </label>
                </div>
              </div>
              <ErrorMessage name="categories" component="div" className="mt-1 text-sm text-red-600" />
            </fieldset>
          </div>

          {/* Coordinates (Read-only) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="lat" className="block text-sm font-medium text-gray-700">
                Latitude
              </label>
              <Field
                type="text"
                name="lat"
                id="lat"
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="lng" className="block text-sm font-medium text-gray-700">
                Longitude
              </label>
              <Field
                type="text"
                name="lng"
                id="lng"
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isSubmitting ? 'Saving...' : 'Save Pin'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}