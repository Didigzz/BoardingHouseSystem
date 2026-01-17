import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '@/lib/store';
import { getAuthToken } from '@/lib/trpc';
import { colors, spacing, typography } from '@/lib/theme';
import { Button } from '@/components/ui';

export default function WelcomeScreen() {
  const { isAuthenticated, user, setLoading } = useAuthStore();

  const checkAuth = async () => {
    const token = await getAuthToken();
    if (token) {
      // TODO: Validate token and get user data
      // For now, redirect based on stored user role
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'landlord') {
        router.replace('/(landlord)/dashboard');
      } else {
        router.replace('/(boarder)/home');
      }
    }
  }, [isAuthenticated, user]);

  return (
    <LinearGradient
      colors={[colors.primary[700], colors.primary[900]]}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>BHMS</Text>
          </View>
        </View>

        <Text style={styles.title}>Boarding House{'\n'}Management System</Text>
        <Text style={styles.subtitle}>
          Manage your property efficiently with our modern solution
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            onPress={() => router.push('/(auth)/login')}
            variant="primary"
            size="lg"
            fullWidth
            style={styles.loginButton}
          >
            Sign In
          </Button>

          <Button
            onPress={() => router.push('/(auth)/access-code')}
            variant="outline"
            size="lg"
            fullWidth
            style={styles.accessButton}
          >
            Enter Access Code
          </Button>
        </View>

        <Text style={styles.footerText}>For landlords and boarders</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  logoContainer: {
    marginBottom: spacing['2xl'],
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.primary[700],
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.primary[200],
    textAlign: 'center',
    marginBottom: spacing['2xl'],
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: spacing.md,
  },
  loginButton: {
    backgroundColor: colors.white,
  },
  accessButton: {
    borderColor: colors.white,
  },
  footerText: {
    marginTop: spacing['2xl'],
    fontSize: typography.fontSize.sm,
    color: colors.primary[300],
  },
});
