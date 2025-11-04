import { Task, TaskPriority, PriorityScore, TaskStatus } from '../types/index.js'
import { daysUntilDue } from '../utils/index.js'
import { differenceInDays } from 'date-fns'

export class PriorityEstimator {
  /**
   * Estimate priority for a task
   * @param task Task to estimate priority for
   * @returns PriorityScore object with detailed scoring
   */
  estimate(task: Task): PriorityScore {
    const dueDateScore = this.calculateDueDateScore(task.dueDate)
    const ageScore = this.calculateAgeScore(task.createdAt)
    const statusScore = this.calculateStatusScore(task.status)
    const totalScore = this.calculateTotalScore(dueDateScore, ageScore, statusScore)
    const estimatedPriority = this.scoreToPriority(totalScore)

    return {
      dueDateScore,
      ageScore,
      statusScore,
      totalScore,
      estimatedPriority,
    }
  }

  /**
   * Calculate due date score (0-100)
   * Weight: 50%
   */
  private calculateDueDateScore(dueDate: string | null): number {
    const days = daysUntilDue(dueDate)

    if (days === null) {
      return 0 // No due date
    }

    if (days < 0) {
      return 100 // Overdue
    }

    if (days <= 1) {
      return 90 // Within 1 day
    }

    if (days <= 3) {
      return 70 // Within 3 days
    }

    if (days <= 7) {
      return 50 // Within 7 days
    }

    if (days <= 14) {
      return 30 // Within 14 days
    }

    return 10 // More than 14 days
  }

  /**
   * Calculate task age score (0-100)
   * Weight: 20%
   */
  private calculateAgeScore(createdAt: string): number {
    const now = new Date()
    const created = new Date(createdAt)
    const ageInDays = differenceInDays(now, created)

    if (ageInDays >= 30) {
      return 100 // More than 30 days old
    }

    if (ageInDays >= 14) {
      return 70 // 14-30 days old
    }

    if (ageInDays >= 7) {
      return 50 // 7-14 days old
    }

    return 30 // Less than 7 days old
  }

  /**
   * Calculate status score (0-100)
   * Weight: 30%
   */
  private calculateStatusScore(status: TaskStatus): number {
    switch (status) {
      case 'in-progress':
        return 100
      case 'todo':
        return 50
      case 'done':
        return 0
      default:
        return 0
    }
  }

  /**
   * Calculate weighted total score
   */
  private calculateTotalScore(dueDateScore: number, ageScore: number, statusScore: number): number {
    const weighted = dueDateScore * 0.5 + ageScore * 0.2 + statusScore * 0.3
    return Math.round(weighted)
  }

  /**
   * Convert total score to priority level
   */
  private scoreToPriority(score: number): TaskPriority {
    if (score >= 70) {
      return 'high'
    }

    if (score >= 40) {
      return 'medium'
    }

    return 'low'
  }
}
