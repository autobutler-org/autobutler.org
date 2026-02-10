<template>
  <main class="contact-page">
    <div class="contact-content">
      <h1>Contact Us</h1>
      <div class="contact-info">
        <div class="section">
          <h2>Get in Touch</h2>
          <p>Have questions or need assistance? We're here to help!</p>
          <div class="contact-details">
            <p><strong>Email:</strong> support@autobutler.org</p>
            <p>
              <strong>Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM EST
            </p>
          </div>
        </div>

        <form v-if="!submitted" class="contact-form" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Name <span class="required">*</span></label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              required
              maxlength="100"
              placeholder="Your name"
            />
          </div>

          <div class="form-group">
            <label for="email">Email <span class="required">*</span></label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              maxlength="254"
              placeholder="your@email.com"
            />
          </div>

          <div class="form-group">
            <label for="subject">Subject <span class="required">*</span></label>
            <input
              id="subject"
              v-model="formData.subject"
              type="text"
              required
              maxlength="200"
              placeholder="How can we help?"
            />
          </div>

          <div class="form-group">
            <label for="message">Message <span class="required">*</span></label>
            <textarea
              id="message"
              v-model="formData.message"
              required
              rows="5"
              maxlength="2000"
              placeholder="Your message..."
            />
            <span class="char-count" v-if="formData.message.length > 0">
              {{ formData.message.length }}/2000 characters
            </span>
          </div>

          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? 'Sending...' : 'Send Message' }}
          </button>

          <p v-if="error" class="error-message">{{ error }}</p>
        </form>

        <div v-else class="success-message">
          <div class="success-icon">✓</div>
          <h3>Message Sent!</h3>
          <p>
            Thank you for contacting us. We'll get back to you at 
            <strong>{{ formData.email }}</strong> as soon as possible.
          </p>
          <button @click="resetForm" class="reset-btn">Send Another Message</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const formData = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
})

const submitted = ref(false)
const isSubmitting = ref(false)
const error = ref('')

const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '')
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const isValidName = (name: string): boolean => {
  const trimmedName = name.trim()
  return trimmedName.length >= 2 && trimmedName.length <= 100
}

const isValidSubject = (subject: string): boolean => {
  const trimmedSubject = subject.trim()
  return trimmedSubject.length >= 3 && trimmedSubject.length <= 200
}

const isValidMessage = (message: string): boolean => {
  const trimmedMessage = message.trim()
  return trimmedMessage.length >= 10 && trimmedMessage.length <= 2000
}

const validateForm = (): string | null => {
  const sanitizedName = sanitizeInput(formData.value.name)
  const sanitizedEmail = sanitizeInput(formData.value.email)
  const sanitizedSubject = sanitizeInput(formData.value.subject)
  const sanitizedMessage = sanitizeInput(formData.value.message)
  
  if (!isValidName(sanitizedName)) {
    return 'Please enter a valid name (2-100 characters)'
  }
  
  if (!isValidEmail(sanitizedEmail)) {
    return 'Please enter a valid email address'
  }
  
  if (!isValidSubject(sanitizedSubject)) {
    return 'Please enter a valid subject (3-200 characters)'
  }
  
  if (!isValidMessage(sanitizedMessage)) {
    return 'Please enter a message (10-2000 characters)'
  }
  
  return null
}

const handleSubmit = async () => {
  isSubmitting.value = true
  error.value = ''

  // Validate form
  const validationError = validateForm()
  if (validationError) {
    error.value = validationError
    isSubmitting.value = false
    return
  }

  // Sanitize all inputs
  const sanitizedData = {
    name: sanitizeInput(formData.value.name),
    email: sanitizeInput(formData.value.email),
    subject: sanitizeInput(formData.value.subject),
    message: sanitizeInput(formData.value.message)
  }

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sanitizedData),
    })

    if (!response.ok) {
      throw new Error('Failed to send message')
    }

    submitted.value = true
  } catch (err) {
    error.value = 'Something went wrong. Please try again or email us directly at support@autobutler.org'
    console.error('Contact form submission error:', err)
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  formData.value = {
    name: "",
    email: "",
    subject: "",
    message: "",
  }
  submitted.value = false
  error.value = ''
}
</script>

<style scoped>
.contact-page {
  flex: 1;
  width: 100%;
  padding: 2rem 0;
}

.contact-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

h1 {
  color: #4caf50;
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.section {
  margin-bottom: 2.5rem;
}

h2 {
  color: #81c784;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

p {
  color: #e0e0e0;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.contact-details {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 1rem;
}

.contact-form {
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  color: #e0e0e0;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.required {
  color: #ff6b6b;
}

.char-count {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: rgba(224, 224, 224, 0.6);
  text-align: right;
}

input,
textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  color: #e0e0e0;
  font-size: 1rem;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

.submit-btn {
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.submit-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #45a049, #3d8b40);
  transform: translateY(-1px);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  color: #ff6b6b;
  text-align: center;
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 6px;
  border: 1px solid rgba(255, 107, 107, 0.3);
}

.success-message {
  background: rgba(255, 255, 255, 0.05);
  padding: 3rem 2rem;
  border-radius: 8px;
  text-align: center;
}

.success-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: #4caf50;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
}

.success-message h3 {
  color: #81c784;
  margin-bottom: 1rem;
  font-size: 1.8rem;
}

.success-message p {
  color: #e0e0e0;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.success-message strong {
  color: #4caf50;
}

.reset-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
}
</style>
