import { PipelineStage } from 'mongoose';

export function projectStage(
  fields: string[],
  text: string | null,
): PipelineStage[] {
  const projectStage =
    fields?.length > 0
      ? [
          {
            $project: {
              ...fields.reduce((acc, field) => ({ ...acc, [field]: 1 }), {}),
              ...(text ? { score: { $meta: 'textScore' } } : {}),
            },
          },
        ]
      : [];
  return projectStage;
}

export function projection(fields: string[]) {
  return fields?.length
    ? fields.reduce((acc, field) => {
        acc[field] = 1;
        return acc;
      }, {})
    : {};
}
