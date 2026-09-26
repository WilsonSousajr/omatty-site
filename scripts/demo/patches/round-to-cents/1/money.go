// Package ledger keeps accounts in integer cents.
package ledger

import "math"

// Cents converts an amount in dollars to whole cents, rounding to the
// nearest cent: 0.29 is 28.999999999999996 in binary floating point.
func Cents(dollars float64) int64 {
	return int64(math.Round(dollars * 100))
}
