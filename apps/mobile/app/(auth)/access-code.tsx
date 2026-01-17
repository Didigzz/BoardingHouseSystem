import { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '@/lib/theme';
import { Button } from '@/components/ui';
import { useAuthStore } from '@/lib/store';
import { setAuthToken } from '@/lib/trpc';

const CODE_LENGTH = 6;

export default function AccessCodeScreen() {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const { setUser } = useAuthStore();

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text.toUpperCase();
    setCode(newCode);
    setError('');

    // Auto-focus next input
    if (text && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const accessCode = code.join('');
    if (accessCode.length !== CODE_LENGTH) {
      setError('Please enter the complete access code');
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with actual tRPC mutation
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock successful login as boarder
      await setAuthToken('mock_boarder_token');
      setUser({
        id: '2',
        email: 'boarder@example.com',
        name: 'Jane Smith',
        role: 'boarder',
      });

      router.replace('/(boarder)/home');
    } catch {
      setError('Invalid access code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.neutral[700]} />
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="key-outline"
              size={48}
              color={colors.primary[700]}
            />
          </View>

          <Text style={styles.title}>Enter Access Code</Text>
          <Text style={styles.subtitle}>
            Enter the 6-character access code provided by your landlord
          </Text>

          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                style={[
                  styles.codeInput,
                  digit && styles.codeInputFilled,
                  error && styles.codeInputError,
                ]}
                value={digit}
                onChangeText={(text) => handleCodeChange(text, index)}
                onKeyPress={({ nativeEvent }) =>
                  handleKeyPress(nativeEvent.key, index)
                }
                maxLength={1}
                autoCapitalize="characters"
                keyboardType="default"
              />
            ))}
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Button
            onPress={handleSubmit}
            loading={loading}
            fullWidth
            size="lg"
            style={styles.submitButton}
          >
            Verify Code
          </Button>

          <View style={styles.helpContainer}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={colors.neutral[400]}
            />
            <Text style={styles.helpText}>
              Contact your landlord if you don't have an access code
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  keyboardView: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: spacing['2xl'],
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.neutral[500],
    textAlign: 'center',
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  codeContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  codeInput: {
    width: 48,
    height: 56,
    borderWidth: 2,
    borderColor: colors.neutral[200],
    borderRadius: borderRadius.lg,
    backgroundColor: colors.white,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    textAlign: 'center',
    color: colors.neutral[900],
  },
  codeInputFilled: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
  },
  codeInputError: {
    borderColor: colors.error,
  },
  errorText: {
    fontSize: typography.fontSize.sm,
    color: colors.error,
    marginBottom: spacing.md,
  },
  submitButton: {
    marginTop: spacing.lg,
  },
  helpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xl,
    gap: spacing.sm,
  },
  helpText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[400],
  },
});
