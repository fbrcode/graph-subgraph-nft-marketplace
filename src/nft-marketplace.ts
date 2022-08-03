import {
  ItemBought as ItemBoughtEvent,
  ItemCancelled as ItemCancelledEvent,
  ItemListed as ItemListedEvent,
} from "../generated/NftMarketplace/NftMarketplace";

export function handleItemBought(event: ItemBoughtEvent): void {}

export function handleItemCancelled(event: ItemCancelledEvent): void {}

export function handleItemListed(event: ItemListedEvent): void {}
