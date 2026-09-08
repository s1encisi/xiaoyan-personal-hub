import type { ContentStatusLabel, VerificationStatus } from "../_data/content";

type Status = VerificationStatus | ContentStatusLabel;

const labels: Record<Status, string> = {
  verified: "已核实",
  topic: "研究主题",
  placeholder: "资料待完善",
  已确认: "已确认",
  研究主题: "研究主题",
  资料待完善: "资料待完善",
  暂不公开: "暂不公开",
};

const tones: Record<Status, "verified" | "topic" | "placeholder"> = {
  verified: "verified",
  topic: "topic",
  placeholder: "placeholder",
  已确认: "verified",
  研究主题: "topic",
  资料待完善: "placeholder",
  暂不公开: "placeholder",
};

export function StatusBadge({ status }: { status: Status }) {
  return <span className={`status-badge status-${tones[status]}`}>{labels[status]}</span>;
}
