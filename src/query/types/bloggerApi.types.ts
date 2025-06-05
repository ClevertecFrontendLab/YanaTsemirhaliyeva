export type BloggerListParams = {
    limit: string | number;
    currentUserId: string;
};

export type BloggerParams = {
    bloggerId: string;
    currentUserId: string;
};

export type ToggleSubscriptionParams = {
    toUserId: string;
    fromUserId: string;
};
