import { Grid, Skeleton as SkeletonComponent } from "@mantine/core";
export default function Skeleton({
  units,
  height,
}: Readonly<{ units: number; height: number }>) {
  const skeletonItems = [];
  for (let i = 0; i < units; i++) {
    skeletonItems.push(
      <Grid.Col key={i} span={{ base: 12, md: 6 }}>
        <SkeletonComponent radius="md" height={height}></SkeletonComponent>
      </Grid.Col>
    );
  }

  return (
    <Grid grow pt="xl">
      {skeletonItems}
    </Grid>
  );
}
