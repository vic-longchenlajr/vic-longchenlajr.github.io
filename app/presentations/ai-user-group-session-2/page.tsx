'use client';

import { PresentationEngine } from '@/components/PresentationEngine';
import presentationData from './presentation.json';
import type { PresentationMeta, SlideDefinition } from '@/components/PresentationEngine';

export default function AIUserGroupSession2Page() {
    return (
        <PresentationEngine
            meta={presentationData.meta as PresentationMeta}
            slides={presentationData.slides as SlideDefinition[]}
        />
    );
}
