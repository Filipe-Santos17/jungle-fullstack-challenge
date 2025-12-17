import { faker } from '@faker-js/faker';

import {
    KanbanBoard,
    KanbanCard,
    KanbanCards,
    KanbanHeader,
    KanbanProvider,
} from '@/components/ui/shadcn-io/kanban';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import capitalize from "@/utils/capitalize-text"
import { dateFormatter, shortDateFormatter } from "@/utils/date-formatters"

interface iFeaturesDataKanban {
    features: KanbanItemProps[]
    setFeatures: []
}

const columns = [
    { id: faker.string.uuid(), name: 'TODO', color: '#6B7280' },
    { id: faker.string.uuid(), name: 'IN_PROGRESS', color: '#F59E0B' },
    { id: faker.string.uuid(), name: 'REVIEW', color: '#10B981' },
    { id: faker.string.uuid(), name: 'DONE', color: '#10B981' },
];

export default function KanbanTasks({
    features,
    setFeatures,
}: iFeaturesDataKanban) {
    return (
        <KanbanProvider
            columns={columns}
            data={features}
            onDataChange={setFeatures}
            className='px-4'
        >
            {(column) => (
                <KanbanBoard id={column.id} key={column.id}>
                    <KanbanHeader>
                        <div className="flex items-center gap-2">
                            <div
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: column.color }}
                            />
                            <span>{column.name}</span>
                        </div>
                    </KanbanHeader>
                    <KanbanCards id={column.id} className='max-h-[80vh] pb-19 overflow-auto'>
                        {(feature: (typeof features)[number]) => (
                            <KanbanCard
                                column={column.id}
                                id={feature.id}
                                key={feature.id}
                                name={feature.name}
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex flex-col gap-1">
                                        <p className="m-0 flex-1 font-medium text-sm">
                                            {feature.name}
                                        </p>
                                    </div>
                                    {feature.owner && (
                                        <Avatar className="h-4 w-4 shrink-0">
                                            <AvatarImage src={feature.owner.image} />
                                            <AvatarFallback>
                                                {feature.owner.name?.slice(0, 2)}
                                            </AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                                <p className="m-0 text-muted-foreground text-xs">
                                    {shortDateFormatter.format(feature.startAt)} -{' '}
                                    {dateFormatter.format(feature.endAt)}
                                </p>
                            </KanbanCard>
                        )}
                    </KanbanCards>
                </KanbanBoard>
            )}
        </KanbanProvider>
    )
}
