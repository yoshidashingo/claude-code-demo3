import { format, formatDistanceToNow, parseISO } from 'date-fns'
import { ja } from 'date-fns/locale'

/**
 * Format ISO date string to readable format
 * @param dateString ISO 8601 date string
 * @param pattern date-fns format pattern (default: 'yyyy-MM-dd HH:mm')
 * @returns Formatted date string
 */
export function formatDate(dateString: string, pattern: string = 'yyyy-MM-dd HH:mm'): string {
  try {
    const date = parseISO(dateString)
    return format(date, pattern, { locale: ja })
  } catch (_error) {
    return dateString
  }
}

/**
 * Format date to relative time (e.g., "2 days ago")
 * @param dateString ISO 8601 date string
 * @returns Relative time string in Japanese
 */
export function formatRelative(dateString: string): string {
  try {
    const date = parseISO(dateString)
    return formatDistanceToNow(date, { addSuffix: true, locale: ja })
  } catch (_error) {
    return dateString
  }
}

/**
 * Calculate days until due date
 * @param dueDateString ISO 8601 date string
 * @returns Number of days (negative if overdue, null if no due date)
 */
export function daysUntilDue(dueDateString: string | null): number | null {
  if (!dueDateString) return null

  try {
    const dueDate = parseISO(dueDateString)
    const now = new Date()
    const diffTime = dueDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  } catch (_error) {
    return null
  }
}
