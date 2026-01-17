import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '@/lib/theme';
import { Card, Button } from '@/components/ui';
import { useAuthStore, useThemeStore } from '@/lib/store';
import { removeAuthToken } from '@/lib/trpc';

export default function BoarderProfileScreen() {
  const { user, logout } = useAuthStore();
  const { isDark, toggleTheme } = useThemeStore();

  const handleLogout = async () => {
    await removeAuthToken();
    logout();
    router.replace('/');
  };

  // Mock data
  const profileData = {
    accessCode: 'MS2024',
    phone: '+63 912 345 6789',
    emergencyContact: 'Juan Santos - +63 923 456 7890',
    moveInDate: '2024-01-15',
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Profile</Text>

        <Card style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name
                ?.split(' ')
                .map((n) => n[0])
                .join('') || 'U'}
            </Text>
          </View>
          <Text style={styles.profileName}>{user?.name || 'User'}</Text>
          <Text style={styles.profileEmail}>
            {user?.email || 'email@example.com'}
          </Text>
          <View style={styles.accessCodeContainer}>
            <Text style={styles.accessCodeLabel}>Access Code</Text>
            <View style={styles.accessCodeBadge}>
              <Text style={styles.accessCodeText}>
                {profileData.accessCode}
              </Text>
            </View>
          </View>
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <Card>
            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Ionicons
                  name="call-outline"
                  size={20}
                  color={colors.primary[700]}
                />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Phone Number</Text>
                <Text style={styles.infoValue}>{profileData.phone}</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="pencil" size={18} color={colors.neutral[400]} />
              </TouchableOpacity>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Ionicons
                  name="alert-circle-outline"
                  size={20}
                  color={colors.primary[700]}
                />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Emergency Contact</Text>
                <Text style={styles.infoValue}>
                  {profileData.emergencyContact}
                </Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="pencil" size={18} color={colors.neutral[400]} />
              </TouchableOpacity>
            </View>

            <View style={[styles.infoItem, { borderBottomWidth: 0 }]}>
              <View style={styles.infoIcon}>
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={colors.primary[700]}
                />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Move-in Date</Text>
                <Text style={styles.infoValue}>{profileData.moveInDate}</Text>
              </View>
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <Card>
            <View style={styles.preferenceItem}>
              <View style={styles.infoIcon}>
                <Ionicons
                  name="moon-outline"
                  size={20}
                  color={colors.primary[700]}
                />
              </View>
              <Text style={styles.preferenceLabel}>Dark Mode</Text>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{
                  false: colors.neutral[200],
                  true: colors.primary[200],
                }}
                thumbColor={isDark ? colors.primary[700] : colors.neutral[50]}
              />
            </View>

            <TouchableOpacity style={styles.preferenceItem}>
              <View style={styles.infoIcon}>
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color={colors.primary[700]}
                />
              </View>
              <Text style={styles.preferenceLabel}>Notifications</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.neutral[400]}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.preferenceItem, { borderBottomWidth: 0 }]}
            >
              <View style={styles.infoIcon}>
                <Ionicons
                  name="language-outline"
                  size={20}
                  color={colors.primary[700]}
                />
              </View>
              <Text style={styles.preferenceLabel}>Language</Text>
              <View style={styles.preferenceValue}>
                <Text style={styles.preferenceValueText}>English</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.neutral[400]}
                />
              </View>
            </TouchableOpacity>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <Card>
            <TouchableOpacity style={styles.preferenceItem}>
              <View style={styles.infoIcon}>
                <Ionicons
                  name="help-circle-outline"
                  size={20}
                  color={colors.primary[700]}
                />
              </View>
              <Text style={styles.preferenceLabel}>Help Center</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.neutral[400]}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.preferenceItem, { borderBottomWidth: 0 }]}
            >
              <View style={styles.infoIcon}>
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color={colors.primary[700]}
                />
              </View>
              <Text style={styles.preferenceLabel}>Terms & Privacy</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.neutral[400]}
              />
            </TouchableOpacity>
          </Card>
        </View>

        <Button
          onPress={handleLogout}
          variant="ghost"
          fullWidth
          style={styles.logoutButton}
        >
          <View style={styles.logoutContent}>
            <Ionicons name="log-out-outline" size={20} color={colors.error} />
            <Text style={styles.logoutText}>Log Out</Text>
          </View>
        </Button>

        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
    marginVertical: spacing.md,
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.primary[700],
  },
  profileName: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[900],
  },
  profileEmail: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
    marginTop: spacing.xs,
  },
  accessCodeContainer: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  accessCodeLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral[400],
    marginBottom: spacing.xs,
  },
  accessCodeBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary[50],
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.primary[200],
    borderStyle: 'dashed',
  },
  accessCodeText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary[700],
    letterSpacing: 2,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[500],
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral[400],
  },
  infoValue: {
    fontSize: typography.fontSize.base,
    color: colors.neutral[900],
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  preferenceLabel: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.neutral[900],
  },
  preferenceValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  preferenceValueText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
  },
  logoutButton: {
    backgroundColor: colors.error + '10',
    marginTop: spacing.md,
  },
  logoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logoutText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.error,
  },
  version: {
    textAlign: 'center',
    fontSize: typography.fontSize.sm,
    color: colors.neutral[400],
    marginTop: spacing.lg,
  },
});
