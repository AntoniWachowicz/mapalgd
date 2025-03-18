import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Pin form validation schema
const PinSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Za krótka nazwa!')
    .max(50, 'Za długa nazwa!')
    .required('Nazwa jest wymagana'),
  date: Yup.date()
    .required('Data jest wymagana'),
  description: Yup.string()
    .min(10, 'Opis powinien mieć co najmniej 10 znaków')
    .max(500, 'Opis nie powinien przekraczać 500 znaków')
    .required('Opis jest wymagany'),
  imageUrl: Yup.string()
    .url('Musi być prawidłowy URL'),
  value: Yup.number()
    .min(0, 'Wartość nie może być ujemna')
    .required('Wartość jest wymagana'),
  mainCategory: Yup.string()
    .oneOf(['finance', 'social', 'health'], 'Nieprawidłowa kategoria')
    .required('Kategoria główna jest wymagana'),
  categories: Yup.array()
    .of(Yup.string().oneOf(['finance', 'social', 'health'], 'Nieprawidłowa kategoria'))
    .min(1, 'Wymagana jest co najmniej jedna kategoria')
    .required('Kategorie są wymagane')
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
              Nazwa
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
              Data
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
              Opis
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
              URL Obrazka
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
              Wartość (zł)
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
              Kategoria Główna
            </label>
            <Field
              as="select"
              name="mainCategory"
              id="mainCategory"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="finance">Finanse</option>
              <option value="social">Społeczne</option>
              <option value="health">Zdrowie</option>
            </Field>
            <ErrorMessage name="mainCategory" component="div" className="mt-1 text-sm text-red-600" />
          </div>

          {/* Categories (Multiple Selection) */}
          <div>
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700">
                Kategorie (Wybierz wszystkie pasujące)
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
                    Finanse
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
                    Społeczne
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
                    Zdrowie
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
                Szerokość geograficzna
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
                Długość geograficzna
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
              Anuluj
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isSubmitting ? 'Zapisywanie...' : 'Zapisz punkt'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}