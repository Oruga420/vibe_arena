"use client";

export const formatCurrency = (value, currency) => {
    const amount = Number.isFinite(value) ? value : 0;
    const numeric = amount.toLocaleString("en-CA");
    return `$${numeric} ${currency}`;
};

export const buildDropTokens = (data) => {
    const entryFee = data?.entryFee ?? 100;
    const currency = data?.currency ?? "CAD";
    const min = data?.minGladiators ?? 10;
    const max = data?.maxGladiators ?? 15;
    const prizePctValue = Math.round((data?.prizePct ?? 0.6) * 100);
    const housePctValue = Math.round((data?.housePct ?? 0.4) * 100);
    const pot = data?.pot ?? Math.round(entryFee * (data?.paidCount ?? 0));
    const winnerPayout = data?.winnerPayout ?? Math.round(pot * (data?.prizePct ?? 0.6));
    const houseCut = data?.houseCut ?? Math.round(pot * (data?.housePct ?? 0.4));
    const feeValue = `$${Number(entryFee).toLocaleString("en-CA")}`;

    return {
        fee: `${feeValue} ${currency}`,
        feeValue,
        currency,
        min,
        max,
        prizePct: prizePctValue,
        housePct: housePctValue,
        pot: formatCurrency(pot, currency),
        winnerPayout: formatCurrency(winnerPayout, currency),
        houseCut: formatCurrency(houseCut, currency)
    };
};

export const formatTemplate = (template, tokens) => {
    if (!template) {
        return "";
    }
    return template.replace(/\{(\w+)\}/g, (match, key) => {
        if (tokens && Object.prototype.hasOwnProperty.call(tokens, key)) {
            return tokens[key];
        }
        return match;
    });
};
