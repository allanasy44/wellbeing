import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Brain, 
  Mic, 
  Activity, 
  Heart,
  Thermometer,
  Pill,
  FileText,
  TrendingUp
} from 'lucide-react-native';

export default function HealthScreen() {
  const [symptoms, setSymptoms] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSymptomAnalysis = () => {
    // Mock analysis
    console.log('Analyzing symptoms:', symptoms);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Mock voice recording
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>AI Health Assistant</Text>
          <Text style={styles.subtitle}>Describe your symptoms for AI-powered analysis</Text>
        </View>

        {/* Symptom Input */}
        <View style={styles.card}>
          <View style={styles.inputHeader}>
            <Brain size={24} color="#39683A" />
            <Text style={styles.inputTitle}>Describe Your Symptoms</Text>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="Tell me how you're feeling today..."
            multiline
            numberOfLines={4}
            value={symptoms}
            onChangeText={setSymptoms}
            textAlignVertical="top"
          />
          <View style={styles.inputActions}>
            <TouchableOpacity 
              style={[styles.recordButton, isRecording && styles.recordingActive]}
              onPress={toggleRecording}
            >
              <Mic size={20} color={isRecording ? "#fff" : "#39683A"} />
              <Text style={[styles.recordText, isRecording && styles.recordingText]}>
                {isRecording ? 'Recording...' : 'Voice Input'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.analyzeButton, !symptoms && styles.disabledButton]}
              onPress={handleSymptomAnalysis}
              disabled={!symptoms}
            >
              <Text style={styles.analyzeText}>Analyze</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Symptom Categories */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🤒 Common Symptoms</Text>
          <View style={styles.symptomGrid}>
            {[
              { icon: Thermometer, label: 'Fever', color: '#e74c3c' },
              { icon: Heart, label: 'Chest Pain', color: '#e91e63' },
              { icon: Activity, label: 'Fatigue', color: '#9c27b0' },
              { icon: Brain, label: 'Headache', color: '#3f51b5' },
            ].map((symptom, index) => (
              <TouchableOpacity key={index} style={styles.symptomItem}>
                <View style={[styles.symptomIcon, { backgroundColor: `${symptom.color}20` }]}>
                  <symptom.icon size={20} color={symptom.color} />
                </View>
                <Text style={styles.symptomLabel}>{symptom.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Health Insights */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📊 Health Insights</Text>
          <View style={styles.insightItem}>
            <View style={styles.insightHeader}>
              <TrendingUp size={20} color="#27ae60" />
              <Text style={styles.insightTitle}>Overall Health Trend</Text>
            </View>
            <Text style={styles.insightDescription}>
              Your health metrics have improved by 12% this month. Keep up the good work!
            </Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '85%' }]} />
              </View>
              <Text style={styles.progressText}>85%</Text>
            </View>
          </View>
        </View>

        {/* Previous Analysis */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📋 Recent Analysis</Text>
          <View style={styles.analysisItem}>
            <View style={styles.analysisHeader}>
              <FileText size={16} color="#39683A" />
              <Text style={styles.analysisDate}>Yesterday, 2:30 PM</Text>
            </View>
            <Text style={styles.analysisSymptoms}>Mild headache, fatigue</Text>
            <Text style={styles.analysisResult}>
              Likely cause: Dehydration and lack of sleep. Recommended: Rest and hydration.
            </Text>
            <View style={styles.confidenceContainer}>
              <Text style={styles.confidenceLabel}>Confidence:</Text>
              <Text style={styles.confidenceValue}>87%</Text>
            </View>
          </View>
          
          <View style={styles.analysisItem}>
            <View style={styles.analysisHeader}>
              <FileText size={16} color="#39683A" />
              <Text style={styles.analysisDate}>3 days ago, 10:15 AM</Text>
            </View>
            <Text style={styles.analysisSymptoms}>Sore throat, runny nose</Text>
            <Text style={styles.analysisResult}>
              Likely cause: Common cold. Recommended: Rest, fluids, and over-the-counter remedies.
            </Text>
            <View style={styles.confidenceContainer}>
              <Text style={styles.confidenceLabel}>Confidence:</Text>
              <Text style={styles.confidenceValue}>92%</Text>
            </View>
          </View>
        </View>

        {/* Disclaimer */}
        <View style={[styles.card, styles.disclaimerCard]}>
          <Text style={styles.disclaimerTitle}>⚠️ Important Notice</Text>
          <Text style={styles.disclaimerText}>
            This AI analysis is for informational purposes only and should not replace professional medical advice. 
            Always consult with a qualified healthcare provider for proper diagnosis and treatment.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBF2',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#181D17',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8A98A1',
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#181D17',
    marginLeft: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D6DDE5',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#181D17',
    minHeight: 100,
    marginBottom: 16,
  },
  inputActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#39683A',
    backgroundColor: 'transparent',
  },
  recordingActive: {
    backgroundColor: '#39683A',
  },
  recordText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#39683A',
  },
  recordingText: {
    color: '#fff',
  },
  analyzeButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    backgroundColor: '#39683A',
  },
  disabledButton: {
    backgroundColor: '#C5C7C5',
  },
  analyzeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#181D17',
    marginBottom: 16,
  },
  symptomGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  symptomItem: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 12,
    backgroundColor: '#F8FBF2',
    borderRadius: 12,
  },
  symptomIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  symptomLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#181D17',
    textAlign: 'center',
  },
  insightItem: {
    backgroundColor: '#F8FBF2',
    padding: 16,
    borderRadius: 12,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#181D17',
    marginLeft: 8,
  },
  insightDescription: {
    fontSize: 14,
    color: '#181D17',
    lineHeight: 20,
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#EEEEEE',
    borderRadius: 3,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#39683A',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#39683A',
  },
  analysisItem: {
    backgroundColor: '#F8FBF2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  analysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  analysisDate: {
    fontSize: 12,
    color: '#8A98A1',
    marginLeft: 8,
  },
  analysisSymptoms: {
    fontSize: 14,
    fontWeight: '600',
    color: '#181D17',
    marginBottom: 8,
  },
  analysisResult: {
    fontSize: 14,
    color: '#181D17',
    lineHeight: 20,
    marginBottom: 8,
  },
  confidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  confidenceLabel: {
    fontSize: 12,
    color: '#8A98A1',
    marginRight: 8,
  },
  confidenceValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#39683A',
  },
  disclaimerCard: {
    backgroundColor: '#FFF3CD',
    borderWidth: 1,
    borderColor: '#FFEAA7',
    marginBottom: 20,
  },
  disclaimerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#856404',
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
});