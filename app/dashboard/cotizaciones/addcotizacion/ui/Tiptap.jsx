'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form';
import { BoldIcon, ItalicIcon, ListBulletIcon, NumberedListIcon, StrikethroughIcon } from '@heroicons/react/24/outline'
import { Toggle } from '@/components/ui/toggle';

const Tiptap = ({ value, }) => {
    const { setValue } = useFormContext();
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                orderedList: {
                    HTMLAttributes: {
                        class: 'list-decimal pl-4'
                    }
                },
                bulletList: {
                    HTMLAttributes: {
                        class: 'list-disc pl-4'
                    }
                },
            })
        ],
        editorProps: {
            attributes: {
                class: 'block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-50 sm:py-1.5 sm:text-sm sm:leading-6 bg-transparent dark:text-gray-200 px-4'
            }
        },
        content: value,
        onUpdate: ({ editor }) => {
            const content = editor.getHTML();
            setValue('description', content, {
                shouldValidate: true,
                shouldDirty: true,
                // shouldTouch: true,
            });
            // onChange={({ target }) => setValue('description', target.value)}
        },
    });

    useEffect(() => {
        if (editor?.isEmpty) editor.commands.setContent(value);
    }, [value]);

    return (
        <div className='flex flex-col gap-2'>
            {editor ?
                <div className='border rounded-md border-opacity-20 dark:bg-transparent'>
                    <Toggle
                        pressed={editor.isActive('bold')}
                        onPressedChange={() => editor.chain().focus().toggleBold().run()}
                        size={'sm'}
                        aria-label="Toggle bold"

                    >
                        <BoldIcon className="h-4 w-4 text-white" />
                    </Toggle>
                    <Toggle
                        pressed={editor.isActive('italic')}
                        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                        size={'sm'}
                        aria-label="Toggle italic"
                    >
                        <ItalicIcon className="h-4 w-4 text-white" />
                    </Toggle>
                    <Toggle
                        pressed={editor.isActive('strike')}
                        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
                        size={'sm'}
                    >
                        <StrikethroughIcon className="h-4 w-4 text-white" />
                    </Toggle>
                    <Toggle
                        style={{}}
                        pressed={editor.isActive('orderedList')}
                        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                        size={'sm'}
                    >
                        <ListBulletIcon className="h-4 w-4 text-white" />
                    </Toggle>
                    <Toggle
                        pressed={editor.isActive('bulletList')}
                        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                        size={'sm'}
                    >
                        <NumberedListIcon className="h-4 w-4 text-white" />
                    </Toggle>
                </div>
                : null}
            <EditorContent editor={editor} />
            {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
            <BubbleMenu editor={null}>This is the bubble menu</BubbleMenu> */}
        </div>
    );
}

export default Tiptap