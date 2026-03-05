import type { Book, Chronicle } from "./types";

export function getBookUrl(book:Book) {
    return `/books/${book.id_book}/${book.slug}`;
}

export function getChronicleUrl(chronicle:Chronicle) {
    console.log(`/chronicles/${chronicle.id_chronicle}/${chronicle.slug}`);
    return `/chronicles/${chronicle.id_chronicle}/${chronicle.slug}`;
}

export function getDeviceType() {
    const ua = navigator.userAgent;

    if (/iPad|Tablet|PlayBook|Silk/i.test(ua)) {
        return "tablet";
    }

    if (/Mobile|iPhone|Android/i.test(ua)) {
        return "mobile";
    }
    return "desktop";
}

export function getInstagramUrl(username: string) {
    const device = getDeviceType();

    if(device === "mobile" || device === "tablet") {
        return `instagram://user?username=${username}`;
    }

    return `https://www.instagram.com/${username}/`
}