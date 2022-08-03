import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  ItemBought as ItemBoughtEvent,
  ItemCancelled as ItemCancelledEvent,
  ItemListed as ItemListedEvent,
} from "../generated/NftMarketplace/NftMarketplace";

// get all generated event types
import {
  ActiveItem,
  ItemListed,
  ItemBought,
  ItemCanceled,
} from "../generated/schema";

function getIdFromEventParams(tokenId: BigInt, nftAddress: Address): string {
  return tokenId.toHexString() + nftAddress.toHexString();
}

export function handleItemBought(event: ItemBoughtEvent): void {
  // save the event in our graph & update active items
  // get or create an itemListed object
  // each item needs an unique id
  // ItemBoughtEvent: just the raw event
  // ItemBoughtObject: What we save

  // get the object id
  const id = getIdFromEventParams(
    event.params.tokenId,
    event.params.nftAddress
  );

  // if exists load item bough from id, else create new one
  let itemBought = ItemBought.load(id);
  if (!itemBought) itemBought = new ItemBought(id);

  // load active item from id (assumption that exists already)
  const activeItem = ActiveItem.load(id);

  // update and save itemBought object values
  itemBought.buyer = event.params.buyer;
  itemBought.nftAddress = event.params.nftAddress;
  itemBought.tokenId = event.params.tokenId;
  itemBought.save();

  // update and save activeItem object with the buyer only (all we need in this case)...
  // ...meaning that if it has a buyer, that it has been bought
  // exclamation mark ensures that we'll have an exiting active item
  activeItem!.buyer = event.params.buyer;
  activeItem!.save();
}

export function handleItemCancelled(event: ItemCancelledEvent): void {
  // get the object id
  const id = getIdFromEventParams(
    event.params.tokenId,
    event.params.nftAddress
  );

  // if exists load item canceled from id, else create new one
  let itemCanceled = ItemCanceled.load(id);
  if (!itemCanceled) itemCanceled = new ItemCanceled(id);

  // load active item from id (assumption that exists already)
  const activeItem = ActiveItem.load(id);

  // update and save itemCanceled object values
  itemCanceled.seller = event.params.seller;
  itemCanceled.nftAddress = event.params.nftAddress;
  itemCanceled.tokenId = event.params.tokenId;
  itemCanceled.save();

  // update and save activeItem object with a buyer of 0x0 (all we need in this case)...
  const deadAddress = "0x000000000000000000000000000000000000dEaD"; // burner address
  activeItem!.buyer = Address.fromString(deadAddress);
  activeItem!.save();
}

export function handleItemListed(event: ItemListedEvent): void {
  // get the object id
  const id = getIdFromEventParams(
    event.params.tokenId,
    event.params.nftAddress
  );

  // if exists load item listed from id, else create new one
  let itemListed = ItemListed.load(id);
  if (!itemListed) itemListed = new ItemListed(id);

  // if exists load active item from id, else create new one
  let activeItem = ActiveItem.load(id);
  if (!activeItem) activeItem = new ActiveItem(id);

  // update and save itemListed object values
  itemListed.seller = event.params.seller;
  itemListed.nftAddress = event.params.nftAddress;
  itemListed.tokenId = event.params.tokenId;
  itemListed.price = event.params.price;
  itemListed.save();

  // update and save activeItem object values
  const noBuyer = "0x0000000000000000000000000000000000000000";
  activeItem.seller = event.params.seller;
  activeItem.nftAddress = event.params.nftAddress;
  activeItem.tokenId = event.params.tokenId;
  activeItem.price = event.params.price;
  activeItem.buyer = Address.fromString(noBuyer);
  activeItem.save();
}
