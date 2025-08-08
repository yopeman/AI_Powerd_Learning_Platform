import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { FiHelpCircle, FiMail, FiPhone, FiMessageCircle } from 'react-icons/fi';

export default function Help() {
  const { theme } = useTheme();

  const faqs = [
    {
      question: 'How do I reset my password?',
      answer: 'Go to your profile page and click on "Change Password". Follow the instructions to reset your password.'
    },
    {
      question: 'How can I update my account information?',
      answer: 'Navigate to your profile page where you can edit your personal information and save changes.'
    },
    {
      question: 'Where can I find analytics data?',
      answer: 'Analytics are available in the Analytics section of the dashboard for administrators.'
    },
    {
      question: 'How do I manage user roles?',
      answer: 'Administrators can manage user roles through the User Management section.'
    },
    {
      question: 'How do I contact support?',
      answer: 'You can reach our support team through the contact information provided below.'
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card">
          <div className="card-header">
            <h1 className="card-title">
              <FiHelpCircle size={24} />
              Help Center
            </h1>
            <p className="card-subtitle">
              Find answers to common questions and get support
            </p>
          </div>

          <div className="card-body">
            <div className="space-y-8">
              {/* FAQ Section */}
              <div>
                <h2 className="text-xl font-semibold mb-6" style={{ color: theme.colors.text }}>
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: theme.colors.surfaceHover }}
                    >
                      <h3 className="font-semibold mb-2" style={{ color: theme.colors.text }}>
                        {faq.question}
                      </h3>
                      <p style={{ color: theme.colors.textSecondary }}>
                        {faq.answer}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Contact Section */}
              <div>
                <h2 className="text-xl font-semibold mb-6" style={{ color: theme.colors.text }}>
                  Contact Support
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div 
                    className="p-6 rounded-lg text-center"
                    style={{ backgroundColor: theme.colors.surfaceHover }}
                  >
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: theme.colors.primary + '20', color: theme.colors.primary }}
                    >
                      <FiMail size={24} />
                    </div>
                    <h3 className="font-semibold mb-2" style={{ color: theme.colors.text }}>
                      Email Support
                    </h3>
                    <p style={{ color: theme.colors.textSecondary }}>
                      support@aiplp.com
                    </p>
                  </div>

                  <div 
                    className="p-6 rounded-lg text-center"
                    style={{ backgroundColor: theme.colors.surfaceHover }}
                  >
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: theme.colors.secondary + '20', color: theme.colors.secondary }}
                    >
                      <FiPhone size={24} />
                    </div>
                    <h3 className="font-semibold mb-2" style={{ color: theme.colors.text }}>
                      Phone Support
                    </h3>
                    <p style={{ color: theme.colors.textSecondary }}>
                      +1 (555) 123-4567
                    </p>
                  </div>

                  <div 
                    className="p-6 rounded-lg text-center"
                    style={{ backgroundColor: theme.colors.surfaceHover }}
                  >
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: theme.colors.info + '20', color: theme.colors.info }}
                    >
                      <FiMessageCircle size={24} />
                    </div>
                    <h3 className="font-semibold mb-2" style={{ color: theme.colors.text }}>
                      Live Chat
                    </h3>
                    <p style={{ color: theme.colors.textSecondary }}>
                      Available 24/7
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}