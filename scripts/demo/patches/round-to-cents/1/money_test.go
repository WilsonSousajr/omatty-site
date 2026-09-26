package ledger

import "testing"

func TestCentsWhole(t *testing.T) {
	if got := Cents(2); got != 200 {
		t.Fatalf("Cents(2) = %d, want 200", got)
	}
}

func TestCentsRoundsInsteadOfTruncating(t *testing.T) {
	if got := Cents(0.29); got != 29 {
		t.Fatalf("Cents(0.29) = %d, want 29", got)
	}
}
