// Package ledger keeps accounts in integer cents.
package ledger

// Cents converts an amount in dollars to whole cents.
func Cents(dollars float64) int64 {
	return int64(dollars * 100)
}
