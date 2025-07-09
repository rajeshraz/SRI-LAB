import React, { useState } from 'react';
import './stylings/datasheet.css';


const Datasheet = () => {
  const [tests] = useState([
    { 
      id: 1, 
      name: 'Complete blood picture (CBP)', 
      description: 'Comprehensive analysis of blood cells including red cells, white cells, and platelets',
      teluguDescription: 'ఎర్ర రక్తకణాలు, తెల్ల రక్తకణాలు, మరియు ప్లేట్‌లెట్‌ల సమగ్ర విశ్లేషణ',
      duration: '1 hr' 
    },
    { 
      id: 2, 
      name: 'Malaria (rapid)', 
      description: 'Quick test to detect malaria parasites in blood',
      teluguDescription: 'రక్తంలో మలేరియా పరాన్నజీవులను గుర్తించడానికి త్వరిత పరీక్ష',
      duration: '20 mins' 
    },
    { 
      id: 3, 
      name: 'Widal (typhoid)', 
      description: 'Diagnostic test for typhoid fever',
      teluguDescription: 'టైఫాయిడ్ జ్వరానికి నిర్ధారణ పరీక్ష',
      duration: '20 mins' 
    },
    { 
      id: 4, 
      name: 'Bilirubin (zandies)', 
      description: 'Measures levels of bilirubin in blood to assess liver function',
      teluguDescription: 'కాలేయం పనితీరును అంచనా వేయడానికి రక్తంలో బిలిరుబిన్ స్థాయిలను కొలుస్తుంది',
      duration: '20 mins' 
    },
    { 
      id: 5, 
      name: 'Sugar', 
      description: 'Measures blood glucose levels',
      teluguDescription: 'రక్తంలో గ్లూకోజ్ స్థాయిలను కొలుస్తుంది',
      duration: '20 mins' 
    },
    { 
      id: 6, 
      name: 'Creatinine (kidney)', 
      description: 'Evaluates kidney function by measuring creatinine levels',
      teluguDescription: 'కిడ్నీ పనితీరును అంచనా వేయడానికి క్రియాటినిన్ స్థాయిలను కొలుస్తుంది',
      duration: '20 mins' 
    },
    { 
      id: 7, 
      name: 'LFT (liver function test)', 
      description: 'Comprehensive assessment of liver health and function',
      teluguDescription: 'కాలేయ ఆరోగ్యం మరియు పనితీరును సమగ్రంగా అంచనా వేస్తుంది',
      duration: '1 hr' 
    },
    { 
      id: 8, 
      name: 'RFT (renal function test)', 
      description: 'Complete evaluation of kidney function',
      teluguDescription: 'కిడ్నీ పనితీరును పూర్తి స్థాయిలో అంచనా వేస్తుంది',
      duration: '30 mins' 
    },
    { 
      id: 9, 
      name: 'Sodium', 
      description: 'Measures sodium electrolyte levels in blood',
      teluguDescription: 'రక్తంలో సోడియం ఎలక్ట్రోలైట్ స్థాయిలను కొలుస్తుంది',
      duration: '15 mins' 
    },
    { 
      id: 10, 
      name: 'Potassium', 
      description: 'Measures potassium electrolyte levels in blood',
      teluguDescription: 'రక్తంలో పొటాషియం ఎలక్ట్రోలైట్ స్థాయిలను కొలుస్తుంది',
      duration: '15 mins' 
    },
    { 
      id: 11, 
      name: 'HbA1c (3 months average sugar)', 
      description: 'Measures average blood sugar levels over past 3 months',
      teluguDescription: 'గత 3 నెలల రక్త చక్కెర స్థాయిల సగటును కొలుస్తుంది',
      duration: '1 hr' 
    },
    { 
      id: 12, 
      name: 'CRP (C-reactive proteins)', 
      description: 'Measures inflammation levels in the body',
      teluguDescription: 'శరీరంలో ఇన్‌ఫ్లమేషన్ స్థాయిలను కొలుస్తుంది',
      duration: '30 mins' 
    },
    { 
      id: 13, 
      name: 'Calcium', 
      description: 'Measures calcium levels in blood',
      teluguDescription: 'రక్తంలో కాల్షియం స్థాయిలను కొలుస్తుంది',
      duration: '20 mins' 
    },
    { 
      id: 14, 
      name: 'Urine test', 
      description: 'Analysis of urine composition and properties',
      teluguDescription: 'మూత్రం యొక్క సంయోజనాన్ని మరియు లక్షణాలను విశ్లేషిస్తుంది',
      duration: '30 mins' 
    },
    { 
      id: 15, 
      name: 'Pregnancy', 
      description: 'Detects pregnancy hormone (hCG) levels',
      teluguDescription: 'గర్భం హార్మోన్ (hCG) స్థాయిలను గుర్తిస్తుంది',
      duration: '20 mins' 
    },
    { 
      id: 16, 
      name: 'Thyroid (T3, T4, TSH)', 
      description: 'Comprehensive assessment of thyroid function',
      teluguDescription: 'థైరాయిడ్ పనితీరును సమగ్రంగా అంచనా వేస్తుంది',
      duration: '24 hrs' 
    },
    { 
      id: 17, 
      name: 'Vitamin D', 
      description: 'Measures vitamin D levels in blood',
      teluguDescription: 'రక్తంలో విటమిన్ D స్థాయిలను కొలుస్తుంది',
      duration: '24 hrs' 
    },
    { 
      id: 18, 
      name: 'Vitamin B12', 
      description: 'Measures vitamin B12 levels in blood',
      teluguDescription: 'రక్తంలో విటమిన్ B12 స్థాయిలను కొలుస్తుంది',
      duration: '24 hrs' 
    },
    { 
      id: 19, 
      name: 'Dengue', 
      description: 'Detects dengue virus infection',
      teluguDescription: 'డెంగ్యూ వైరస్ సంక్రామణను గుర్తిస్తుంది',
      duration: '30 mins' 
    },
  ]);

  return (
    <div className='datasheetcss' style={{ padding: '1rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Available Tests</h2>
      <div style={{ 
        display: 'grid', 
        gap: '1rem',
        gridTemplateColumns: '1fr',
      }}>
        {tests.map(test => (
          <div 
            key={test.id}
            style={{
              padding: '1rem',
              border: '1px solid #ddd',
              borderRadius: '0.5rem',
              background: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
              e.currentTarget.style.borderColor = '#007bff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = '#ddd';
            }}
          >
            <h3 style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>{test.name}</h3>
            <p style={{ color: '#666', marginBottom: '0.5rem' }}>
              {test.description}
            </p>
            <p style={{ color: '#666', marginBottom: '0.5rem' }}>
              {test.teluguDescription}
            </p>
            <p style={{ color: '#666' }}>
              Duration: {test.duration}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Datasheet;
