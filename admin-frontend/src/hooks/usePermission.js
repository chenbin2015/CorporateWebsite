import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

export function usePermission() {
  const userStore = useUserStore()

  const hasAccess = (permission) => {
    if (!permission) return true
    // TODO: integrate real permission check
    return userStore.isAuthenticated
  }

  const permissions = computed(() => ['project:create', 'project:view'])

  return {
    hasAccess,
    permissions,
  }
}

