/** Import boundaries (AGENTS.md, "Repository layout" and "Dependencies"). */
module.exports = {
  forbidden: [
    {
      name: "no-circular",
      severity: "error",
      from: {},
      to: { circular: true },
    },
    {
      // Invariant 4's analogue: asciinema-player's API has moved between
      // minors, so exactly one component may know it exists.
      name: "asciinema-player-only-in-cast-player",
      severity: "error",
      from: { pathNot: "^components/CastPlayer\\.tsx$" },
      to: { path: "asciinema-player" },
    },
    {
      name: "lib-is-below-the-ui",
      severity: "error",
      from: { path: "^(lib|dictionaries)/" },
      to: { path: "^(components|app)/" },
    },
    {
      name: "dictionaries-are-leaves",
      comment: "A dictionary is strings and a type; it imports nothing else.",
      severity: "error",
      from: { path: "^dictionaries/" },
      to: { pathNot: "^dictionaries/" },
    },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    tsPreCompilationDeps: true,
    tsConfig: { fileName: "tsconfig.json" },
    includeOnly:
      "^(app|components|lib|dictionaries|node_modules)/|^proxy\\.ts$",
  },
};
