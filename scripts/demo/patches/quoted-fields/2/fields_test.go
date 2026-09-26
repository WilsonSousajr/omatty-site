package parser

import (
	"reflect"
	"testing"
)

func TestFieldsPlain(t *testing.T) {
	got := Fields("a,b,c")
	if want := []string{"a", "b", "c"}; !reflect.DeepEqual(got, want) {
		t.Fatalf("Fields = %q, want %q", got, want)
	}
}

func TestFieldsQuotedComma(t *testing.T) {
	got := Fields(`a,"b,c",d`)
	if want := []string{"a", "b,c", "d"}; !reflect.DeepEqual(got, want) {
		t.Fatalf("Fields = %q, want %q", got, want)
	}
}
