// Package parser reads comma-separated records.
package parser

import "strings"

// Fields splits one CSV line into its fields.
func Fields(line string) []string {
	return strings.Split(line, ",")
}
