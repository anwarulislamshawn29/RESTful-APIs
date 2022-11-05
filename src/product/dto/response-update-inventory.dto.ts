import { PickType } from '@nestjs/swagger';
import { CreateInventoryDto } from '../../inventory/dto/create-inventory.dto';

export class ResponseUpdateInventoryDto extends PickType(CreateInventoryDto, [
  'productId',
  'totalQty',
]) { }
