/** Records what was copied, and can be told to refuse, like a denied permission. */
export class FakeClipboard {
  written: string[] = [];
  constructor(private readonly refuse = false) {}

  async writeText(text: string): Promise<void> {
    if (this.refuse) throw new Error("clipboard permission denied");
    this.written.push(text);
  }
}
