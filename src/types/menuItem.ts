export interface MenuItem {
  id: number
  name: string
  url?: string | null
  controller?: string | null
  icon?: string | null
  parentId: number
  isActive?: boolean
  isDeleted?: boolean
  displayOrder?: number
  children?: MenuItem[]
  [key: string]: unknown
}

// Reads and parses the dynamic sidebar menu written to localStorage after login.
export const parseMenuPages = (): MenuItem[] => {
  const raw = localStorage.getItem("menuPages")
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}
