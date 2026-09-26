// Package parser reads comma-separated records.
package parser

import "strings"

// Fields splits one CSV line into its fields. A comma inside double quotes
// belongs to the field, and the quotes around a field are not part of it.
func Fields(line string) []string {
	var fields []string
	start, quoted := 0, false
	for i, r := range line {
		switch {
		case r == '"':
			quoted = !quoted
		case r == ',' && !quoted:
			fields = append(fields, unquote(line[start:i]))
			start = i + 1
		}
	}
	return append(fields, unquote(line[start:]))
}

func unquote(field string) string {
	return strings.Trim(field, `"`)
}
