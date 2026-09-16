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
  已发表: "已发表",
  修回中: "修回中",
  在审: "在审",
  已完成: "已完成",
  会议展示: "会议展示",
};

const tones: Record<Status, "verified" | "topic" | "placeholder"> = {
  verified: "verified",
  topic: "topic",
  placeholder: "placeholder",
  已确认: "verified",
  研究主题: "topic",
  资料待完善: "placeholder",
  暂不公开: "placeholder",
  已发表: "verified",
  修回中: "topic",
  在审: "topic",
  已完成: "verified",
  会议展示: "verified",
};

export function StatusBadge({ status }: { status: Status }) {
  return <span className={`status-badge status-${tones[status]}`}>{labels[status]}</span>;
}
