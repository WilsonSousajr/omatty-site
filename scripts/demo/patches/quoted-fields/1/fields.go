// Package parser reads comma-separated records.
package parser

// Fields splits one CSV line into its fields. A comma inside double quotes
// belongs to the field.
func Fields(line string) []string {
	var fields []string
	start, quoted := 0, false
	for i, r := range line {
		switch {
		case r == '"':
			quoted = !quoted
		case r == ',' && !quoted:
			fields = append(fields, line[start:i])
			start = i + 1
		}
	}
	return append(fields, line[start:])
}
