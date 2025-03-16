/**
 * This file is a placeholder for future MongoDB integration
 * When you're ready to implement MongoDB, you'll need to:
 * 1. Install mongoose: npm install mongoose
 * 2. Set up the MongoDB connection in a lib/mongodb.js file
 * 3. Implement this model
 */

/*
import mongoose from 'mongoose';

// Define the Pin schema
const PinSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this pin'],
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  lat: {
    type: Number,
    required: [true, 'Please provide latitude'],
  },
  lng: {
    type: Number,
    required: [true, 'Please provide longitude'],
  },
  date: {
    type: Date,
    required: [true, 'Please provide a date'],
    default: Date.now,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  imageUrl: {
    type: String,
    required: false,
  },
  value: {
    type: Number,
    required: [true, 'Please provide a numerical value'],
    min: 0
  },
  mainCategory: {
    type: String,
    required: [true, 'Please specify a main category'],
    enum: ['finance', 'social', 'health']
  },
  categories: {
    type: [String],
    validate: {
      validator: function(v) {
        return v.length > 0 && v.every(category => 
          ['finance', 'social', 'health'].includes(category)
        );
      },
      message: 'At least one valid category is required'
    },
    required: [true, 'Please specify at least one category']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Before saving, update the updatedAt field
PinSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Ensure mainCategory is in categories
  if (!this.categories.includes(this.mainCategory)) {
    this.categories.push(this.mainCategory);
  }
  
  next();
});

// Create or retrieve the model
export default mongoose.models.Pin || mongoose.model('Pin', PinSchema);
*/