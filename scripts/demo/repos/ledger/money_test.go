package ledger

import "testing"

func TestCentsWhole(t *testing.T) {
	if got := Cents(2); got != 200 {
		t.Fatalf("Cents(2) = %d, want 200", got)
	}
}
