using System;
using Algorand;
using Algorand.Algod;
using Algorand.Algod.Model;
using Algorand.Algod.Model.Transactions;
using AlgoStudio;
using AlgoStudio.Core;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proxies
{

	
	public class HellowordProxy : ProxyBase
	{
		
		public HellowordProxy(DefaultApi defaultApi, ulong appId) : base(defaultApi, appId) 
		{
		}

		///<summary>
        ///
        ///No_op: CALL, Opt_in: NEVER, Close_out: NEVER, Update_application: NEVER, Delete_application: NEVER
        ///</summary>
		public async Task<string> Hello (Account sender, ulong? fee,string note,  List<BoxRef> boxes, AlgoStudio.Core.OnCompleteType callType = AlgoStudio.Core.OnCompleteType.NoOp )
		{
			byte[] abiHandle = {68,101,100,117,112};
			var result = await base.CallApp(null, fee, callType, 1000, note, sender,  new List<object> {abiHandle}, null, null,null, boxes);
			return Encoding.UTF8.GetString(result.First());

		}

		public async Task<List<Transaction>> Hello_Transactions (Account sender, ulong? fee,string note, List<BoxRef> boxes, AlgoStudio.Core.OnCompleteType callType = AlgoStudio.Core.OnCompleteType.NoOp )
		{
			byte[] abiHandle = {68,101,100,117,112};
			return await base.MakeTransactionList(null, fee, callType, 1000, note, sender,  new List<object> {abiHandle}, null, null,null,boxes);

		}

	}

}
