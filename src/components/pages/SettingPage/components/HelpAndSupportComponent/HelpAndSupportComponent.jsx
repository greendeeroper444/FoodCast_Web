import React, { useState } from 'react'
import styles from './HelpAndSupportComponent.module.css';

const faqData = [
    {
        question: "What is FoodCast?",
        answer:
        "FoodCast is a web-based system designed to enhance the vegetable and fruit supply chain by using predictive analytics. It tracks the locations of farms and suppliers and uses advanced forecasting models to predict the supply and demand of fruits and vegetables based on historical and real-time data."
    },
    {
        question: "Who can access the FoodCast administration panel?",
        answer:
        "The administration panel is accessible to authorized personnel of the Tagum City Economic Enterprise Office (TCEEO) who manage data related to vendors, collectors, suppliers, and forecasting analysis."
    },
    { question: "What data can I record or view in the administration panel?", answer: "" },
    { question: "How do I add a new collector or vendor?", answer: "" },
    { question: "How does FoodCast perform forecasting?", answer: "" },
    { question: "What should I do if I encounter inaccurate forecasts?", answer: "" },
    { question: "Can I generate custom reports?", answer: "" },
    { question: "How can I view the map of supplier locations?", answer: "" },
    { question: "What metrics does FoodCast use to evaluate forecasting accuracy?", answer: "" },
    { question: "How is data secured within FoodCast?", answer: "" },
    { question: "What are the common issues that might arise in FoodCast?", answer: "" },
    { question: "How often is the data updated in FoodCast?", answer: "" },
    { question: "Who should I contact for support?", answer: "" },
];

function HelpAndSupportComponent() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

  return (
    <div className={styles.faqContent}>
        <h2>Frequently Asked Questions (FAQs)</h2>
        <div className={styles.faqList}>
            {
                faqData.map((faq, index) => (
                    <div key={index} className={styles.faqItem}>
                        <div
                            className={`${styles.faqQuestion} ${activeIndex === index ? styles.active : ''}`}
                            onClick={() => toggleAccordion(index)}
                        >
                            <span>{faq.question}</span>
                            <span className={styles.icon}>{activeIndex === index ? '▼' : '◀'}</span>
                        </div>
                        {
                            activeIndex === index && (
                                <div className={styles.faqAnswer}>{faq.answer}</div>
                            )
                        }
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default HelpAndSupportComponent
